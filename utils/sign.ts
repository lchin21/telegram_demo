// import  cryptoUtils  from '@starkware-industries/starkware-crypto-utils';
const starkwareCrypto = require('@starkware-industries/starkware-crypto-utils');
import { CancelOrderRequestParams, SignOrderParams } from '../config/DepositFunctionality/types';

// const {
//   getTransferMsgHash,
//   getLimitOrderMsgHashWithFee,
//   sign: starkexSign,
//   ec,
//   pedersen,
// } = cryptoUtils;


export const signTransfer = (nonce: number, data: any) => {
  const {
    privateKey,
    assetId,
    amount,
    vaultId,
    receiver= '0x6D8909135Ce972189306347B1279252a96E72615',
    receiverVaultId,
    expirationTimestamp = 4194303,
  } = data;
  if (data.privateKey.startsWith('0x')) {
    data.privateKey = data.privateKey.substring(2);
  }
  const msgHash = starkwareCrypto.getTransferMsgHash(
    amount,
    nonce,
    vaultId,
    assetId,
    receiverVaultId,
    receiver,
    expirationTimestamp
  );
  const keyPair = starkwareCrypto.ec.keyFromPrivate(privateKey, 'hex');
  const msgSignature = starkwareCrypto.sign(keyPair, msgHash);
  const { r, s } = msgSignature;
  return {
    r: `0x${r.toString(16)}`,
    s: `0x${s.toString(16)}`,
  };
};

export const signOrder = (data: SignOrderParams) => {
  const {
    expirationTimestamp,
    nonce,
    feeVaultId,
    feeToken,
    tokenBuy,
    amountBuy,
    feeLimit,
    tokenSell,
    amountSell,
    vaultIdSell,
    vaultIdBuy,
  } = data;
  if (data.privateKey.startsWith('0x')) {
    data.privateKey = data.privateKey.substring(2);
  }
    const msgHash = starkwareCrypto.getLimitOrderMsgHashWithFee(
  // @ts-ignore
    vaultIdSell,
    vaultIdBuy,
    amountSell,
    amountBuy,
    tokenSell,
    tokenBuy,
    nonce,
    expirationTimestamp,
    feeToken,
    feeVaultId,
    feeLimit
  );
  const keyPair = starkwareCrypto.ec.keyFromPrivate(data.privateKey, 'hex');
  const msgSignature = starkwareCrypto.sign(keyPair, msgHash);
  const { r, s } = msgSignature;
  return {
    r: `0x${r.toString(16)}`,
    s: `0x${s.toString(16)}`,
  };
};

export const signCancelOrder = (data: CancelOrderRequestParams) => {
  const { orderId, privateKey } = data;
  // const msgHash = pedersen([orderId], 0);
  // @ts-ignore
    const msgHash = pedersen([orderId]);
  const keyPair = starkwareCrypto.ec.keyFromPrivate(privateKey, 'hex');
  const msgSignature = starkwareCrypto.sign(keyPair, msgHash);
  const { r, s } = msgSignature;
  return {
    r: `0x${r.toString(16)}`,
    s: `0x${s.toString(16)}`,
  };
};