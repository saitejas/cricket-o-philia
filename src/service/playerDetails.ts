import { TPlayer } from "../constants/types";

export const getSimilarPlayersToBeDisplayed = (similarPlayers: TPlayer[], maxSimilarPlayersToBeDisplayed: number) => {
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

  export const getSimilarPlayers = (playersData: TPlayer[], currentPlayer: TPlayer) => {
    return playersData.filter((player: TPlayer) => player.type === currentPlayer.type && player.id !== currentPlayer.id)
  }