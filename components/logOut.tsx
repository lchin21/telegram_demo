import React from 'react';

export default function LogOut () {
    window.localStorage.clear();
    console.log('Log Out');
}

