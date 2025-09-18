import { Redirect, Slot } from 'expo-router';
import React from 'react';

const _Layout = () => {

    const isAuthenticated = true; // Replace with your actual authentication logic
    if (!isAuthenticated) <Redirect href={"/sign-in"} />
    return <Slot />
}

export default _Layout