import { Outlet } from "react-router-dom";

import React from 'react'
import Home from "../pages/HomePage";

function Layout() {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default Layout