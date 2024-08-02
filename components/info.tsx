import React, {ReactNode} from 'react';
import {key, generateKey, initReddio} from "@/config/config";
import Modal from "@/components/modal";
import LogOut from "@/components/logOut";
import * as Dialog from '@radix-ui/react-dialog';


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
const handleLogOutClick = () => {
    LogOut()
}

initReddio()
const keyPair = generateKey()
export default function info() {
    return <Modal title={"Info"}>
        <button
            className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-center w-28"}
            onClick={handleCopyClick}>
            Copy starkKey
        </button>
        <Dialog.Close asChild>
        <button
            className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-1 w-28 text-center"}
            onClick={handleLogOutClick}>
            Log Out
        </button>
        </Dialog.Close>
    </Modal>
}