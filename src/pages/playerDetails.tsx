/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TPlayer } from '../constants/types';
import getPlayers from '../service/get-players';
import { useNavigate } from "react-router-dom";
import { getSimilarPlayers, getSimilarPlayersToBeDisplayed } from '../service/playerDetails';

export default function PlayerDetails(){
    const {state : {playerDetails}} = useLocation();
    const navigate = useNavigate();
    const [currentPlayer, setCurrentPlayer] = useState<TPlayer>(playerDetails);
    const [playersData, setPlayersData] = useState<TPlayer[]>([]);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
    const [similarPlayers, setSimilarPlayers] = useState<TPlayer[]>([]);
    const maxSimilarPlayersToBeDisplayed = 5;

  useEffect(() => {
    void fetchPlayersData();
  }, []);

  useEffect(()=>{
    findSimilarPlayers(playersData, currentPlayer);
  }, [currentPlayer])

  const fetchPlayersData = async () => {
    setIsDataLoading(true);
    const response = await getPlayers();
    if (response) {
        setPlayersData(response);
        findSimilarPlayers(response, currentPlayer);
    }
    setIsDataLoading(false);
  };

  const findSimilarPlayers = (playersData: TPlayer[], currentPlayer: TPlayer) => {
    const tempSimilarPlayers = getSimilarPlayers(playersData, currentPlayer);
    setSimilarPlayers(tempSimilarPlayers);
  }

    return(
        <div>
            <img onClick={() => navigate('/')} className={'w-[20px] h-[20px]'} alt='back' src={require('../assets/images/back.png')} />
            player details
            {currentPlayer?.name}
            {similarPlayers.length && (
                getSimilarPlayersToBeDisplayed(similarPlayers, maxSimilarPlayersToBeDisplayed).map((player, index) =>{
                    return <div key={index} onClick={() => setCurrentPlayer(player)}>{player.name}</div>
                })
            )}
        </div>
    )
}