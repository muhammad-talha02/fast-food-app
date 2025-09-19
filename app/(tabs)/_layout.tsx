import { Redirect, Slot } from "expo-router";
import React from "react";

const _Layout = () => {
  const isAuthenticated = false; // Replace with your actual authentication logic

  // const getUser = await getCurrentUser()
  // console.log({getUser});
  if (!isAuthenticated) return <Redirect href={'/sign-in'}/>
  return <Slot />;
};

export default _Layout;
