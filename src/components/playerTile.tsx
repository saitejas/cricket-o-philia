import React from 'react';
import { TPlayer } from '../constants/types';

export const PlayerTile = ({ player }: { player: TPlayer }) => {
    return (
      <div className="rounded-lg shadow p-4 bg-gradient-to-r from-tableGradientFrom to-tableGradientTo cursor-pointer">
        <div className="w-full flex flex-row justify-center items-center mb-[25px]">
          <img src={player.avatar} className="h-[200px] w-full" alt={String(player.name)} />
        </div>
        <p className="text-white">
          {player.name}
        </p>
        <div className="h-[250px] overflow-scroll mb-[20px]">
            <p className="mt-2 text-sm text-gray-400">{player.description}</p>
        </div>
        <p className="mt-2 text-xs text-gray-400">Type: {player.type}</p>
        <p className="mt-2 text-xs text-gray-400">Points: {player.points}</p>
      </div>
    );
  };