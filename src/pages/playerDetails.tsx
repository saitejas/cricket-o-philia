import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TPlayer } from '../constants/types';
import getPlayers from '../service/get-players';
import { useNavigate } from "react-router-dom";

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
    findSimilarPlayers(playersData);
  }, [currentPlayer])

  const fetchPlayersData = async () => {
    setIsDataLoading(true);
    const response = await getPlayers();
    if (response) {
        setPlayersData(response);
        findSimilarPlayers(response);
    }
    setIsDataLoading(false);
  };

  const findSimilarPlayers = (playersData: TPlayer[]) => {
    const tempSimilarPlayers = playersData.filter((player: TPlayer) => player.type === currentPlayer.type && player.id !== currentPlayer.id)
    setSimilarPlayers(tempSimilarPlayers);
  }

  const getSimilarPlayersToBeDisplayed = (similarPlayers: TPlayer[]) => {
    if(similarPlayers.length <= maxSimilarPlayersToBeDisplayed){
        return similarPlayers;
    }
    const similarPlayersToBeDisplayed: TPlayer[] = [];
    while (similarPlayersToBeDisplayed.length < maxSimilarPlayersToBeDisplayed) {
      const randomIndex = Math.floor(Math.random() * similarPlayers.length);
      const randomSimilarPlayer = similarPlayers[randomIndex];
      if (!similarPlayersToBeDisplayed.includes(randomSimilarPlayer)) {
        similarPlayersToBeDisplayed.push(randomSimilarPlayer);
      }
    }
    return similarPlayersToBeDisplayed;
  }
    return(
        <div>
            <img onClick={() => navigate('/')} className={'w-[20px] h-[20px]'} alt='back' src={require('../assets/images/back.png')} />
            player details
            {currentPlayer?.name}
            {similarPlayers.length && (
                getSimilarPlayersToBeDisplayed(similarPlayers).map((player, index) =>{
                    return <div key={index} onClick={() => setCurrentPlayer(player)}>{player.name}</div>
                })
            )}
        </div>
    )
}