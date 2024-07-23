import React from "react";
import {key, generateKey, initReddio} from "@/config/config";
import Modal from "@/components/modal";
import copy from "copy-to-clipboard"


const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(key.publicKey);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };
initReddio()
const keyPair = generateKey()
export default function info() {
    return <Modal title={"Info"} >
    <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"} onClick={handleCopyClick}>
        Copy starkKey
    </button>
    </Modal>
}