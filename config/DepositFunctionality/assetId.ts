// @ts-nocheck
import BN from 'bn.js';
import * as encUtils from 'enc-utils';
import { ethers } from 'ethers';
import sha3 from 'js-sha3';
import assert from 'assert';

// Generate BN of 1.
const oneBn = new BN('1', 16);

// Used to mask the 251 least signifcant bits given by Keccack256 to produce the final asset ID.
const mask = new BN(
  '3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  16
);

// Used to mask the 240 least signifcant bits given by Keccack256 to produce the final asset ID
// (for mintable assets).
const mask240 = new BN(
  'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  16
);
const maskMintabilityBit = new BN(
  '400000000000000000000000000000000000000000000000000000000000000',
  16
);

function getAssetId(assetDict) {
  const assetType = new BN(
    encUtils.removeHexPrefix(getAssetType(assetDict)),
    16
  );
  // For ETH and ERC20, the asset ID is simply the asset type.
  let assetId = assetType;
  if (assetDict.type === 'ERC721') {
    // ERC721 assets require a slightly different construction for asset info.
    let assetInfo = new BN(encUtils.utf8ToBuffer('NFT:'), 16);
    // ExpectedLen is equal to the length (in hex characters) of the appended strings:
    //   'NFT:' (8 characters), 'assetType' (64 characters), 'tokenId' (64 characters).
    // Where assetType and tokenId are each padded with 0's to account for 64 hex characters
    // each.
    // We use this in order to pad the final assetInfo string with leading zeros in case the
    // calculation discarded them in the process.
    const expectedLen = 8 + 64 + 64;
    assetInfo = assetInfo.ushln(256).add(assetType);
    assetInfo = assetInfo
      .ushln(256)
      .add(new BN(parseInt(assetDict.data.tokenId), 16));
    assetId = sha3.keccak_256(
      encUtils.hexToBuffer(addLeadingZeroes(assetInfo.toJSON(), expectedLen))
    );
    assetId = new BN(assetId, 16);
    assetId = assetId.and(mask);
  } else if (
    assetDict.type === 'MINTABLE_ERC721' ||
    assetDict.type === 'MINTABLE_ERC20'
  ) {
    let assetInfo = new BN(encUtils.utf8ToBuffer('MINTABLE:'), 16);
    // ExpectedLen is equal to the length (in hex characters) of the appended strings:
    //   'MINTABLE:' (18 characters), 'assetType' (64 characters), 'blobHash' (64 characters).
    // Where assetType and blobHash are each padded with 0's to account for 64 hex characters
    // each.
    // We use this in order to pad the final assetInfo string with leading zeros in case the
    // calculation discarded them in the process.
    const expectedLen = 18 + 64 + 64;
    assetInfo = assetInfo.ushln(256).add(assetType);
    const blobHash = blobToBlobHash(assetDict.data.blob);
    assetInfo = assetInfo
      .ushln(256)
      .add(new BN(encUtils.removeHexPrefix(blobHash), 16));
    assetId = sha3.keccak_256(
      encUtils.hexToBuffer(addLeadingZeroes(assetInfo.toJSON(), expectedLen))
    );
    assetId = new BN(assetId, 16);
    assetId = assetId.and(mask240);
    assetId = assetId.or(maskMintabilityBit);
  }

  return '0x' + assetId.toString('hex', 64);
}

export {getAssetId}