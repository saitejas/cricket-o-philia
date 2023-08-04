import React from "react";
import { Route, Routes } from "react-router-dom";
import Players from "../pages/players";

export default function CustomRouter(){
    return(
        <Routes>
            <Route path="/" element={<Players/>}></Route>
        </Routes>
    )
}