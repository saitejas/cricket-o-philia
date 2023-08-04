import React from "react";
import { Route, Routes } from "react-router-dom";
import Players from "../pages/players";
import PlayerDetails from "../pages/playerDetails";

export default function CustomRouter(){
    return(
        <Routes>
            <Route path="/" element={<Players/>}></Route>
            <Route path="player" element={<PlayerDetails/>}></Route>
        </Routes>
    )
}