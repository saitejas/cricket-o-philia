/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import getPlayers from "../service/get-players";
import { TPlayer } from "../constants/types";
import { PlayersTable } from "../components/playerTable";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";

export default function Players() {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [playersData, setPlayersData] = useState<TPlayer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchPlayersData();
  }, []);

  const fetchPlayersData = async () => {
    setIsDataLoading(true);
    const response = await getPlayers();
    if (response) {
      setPlayersData(response);
    }
    setIsDataLoading(false);
  };

  return (
    <div>
      <h1 className="text-center text-white text-[120px] font-handjet">Cricket-O-Philia</h1>
      {isDataLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="container">
          <PlayersTable data={playersData} navigate={navigate} />
        </div>
      )}
    </div>
  );
}
