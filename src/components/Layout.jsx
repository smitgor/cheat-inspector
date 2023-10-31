import React from "react";
import Header from "./header/header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}