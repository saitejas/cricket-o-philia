/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TPlayer } from "../constants/types";
import getPlayers from "../service/get-players";
import { useNavigate } from "react-router-dom";
import {
  getSimilarPlayers,
  getSimilarPlayersToBeDisplayed,
} from "../service/playerDetails";
import moment from "moment";
import { PlayerTile } from "../components/playerTile";

export default function PlayerDetails() {
  const {
    state: { playerDetails },
  } = useLocation();
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState<TPlayer>(playerDetails);
  const [playersData, setPlayersData] = useState<TPlayer[]>([]);
  const [similarPlayers, setSimilarPlayers] = useState<TPlayer[]>([]);
  const maxSimilarPlayersToBeDisplayed = 5;

  useEffect(() => {
    void fetchPlayersData();
  }, []);

  useEffect(() => {
    findSimilarPlayers(playersData, currentPlayer);
  }, [currentPlayer]);

  const fetchPlayersData = async () => {
    const response = await getPlayers();
    if (response) {
      setPlayersData(response);
      findSimilarPlayers(response, currentPlayer);
    }
  };

  const findSimilarPlayers = (
    playersData: TPlayer[],
    currentPlayer: TPlayer
  ) => {
    const tempSimilarPlayers = getSimilarPlayers(playersData, currentPlayer);
    setSimilarPlayers(tempSimilarPlayers);
  };

  return (
    <div className="w-full flex-1 h-[100%] container mt-[20px]">
      <img
        onClick={() => navigate("/")}
        className={"w-[28px] h-[30px]"}
        alt="back"
        src={require("../assets/images/back.png")}
      />
      <div className="w-full my-5 p-5 md:p-10 rounded-lg flex flex-col md:flex-row justify-between items-center  min-h-[300px] text-white" style={{backgroundImage: `url(${require("../assets/images/playerBg.png")})`}}>
        <div className="flex-1">
          <div className="text-2xl md:text-4xl">{currentPlayer.name}</div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-1/2 mt-4 md:mt-8">
            <div className="flex flex-col justify-between w-full md:w-2/5 md:mr-8">
              <div className="flex flex-row justify-between border-b border-white py-2">
                <div>Role: </div>
                <div>{currentPlayer.type}</div>
              </div>
              <div className="flex flex-row justify-between py-2">
                <div>DOB: </div>
                <div>
                  {moment(new Date(Number(currentPlayer.dob))).format("ll")}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between w-full md:w-1/5 mt-4 md:mt-0 md:ml-8">
              <div className="flex flex-row justify-between border-b border-white py-2">
                <div>Rank: </div>
                <div>{currentPlayer.rank}</div>
              </div>
              <div className="flex flex-row justify-between py-2">
                <div>Points: </div>
                <div>{currentPlayer.points}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 md:mt-0">
          <img
            src={currentPlayer.avatar}
            className="h-[260px] w-[300px]"
            alt="Player Avatar"
          />
        </div>
      </div>

      <div className="rounded-lg shadow p-4 bg-gradient-to-r from-[#044885] to-[#06579f] text-white mb-[20px]" >
        <div className="text-[22px] text-white mb-[10px] font-extrabold">Description</div>
        <p className="w-[80%] mb-[20px]">{currentPlayer.description}</p>
        {similarPlayers.length > 0 && <div className="mt-[100px]">
          <div className="text-[26px] my-[10px] text-white font-extrabold">Players with similar interests...</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {
            getSimilarPlayersToBeDisplayed(
              similarPlayers,
              maxSimilarPlayersToBeDisplayed
            ).map((player, index) => {
              return (
                <div key={index} onClick={() => setCurrentPlayer(player)}>
                  <PlayerTile player={player} />
                </div>
              );
            })}
        </div>
        </div>}
        </div>
    </div>
  );
}
