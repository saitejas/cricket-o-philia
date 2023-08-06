/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { PlayerType } from "../constants/enum";
import { TPlayer } from "../constants/types";
import { readFromStorage, writeToStorage } from "../service/localStorage";
import moment from "moment";

export function PlayersTable ({ data, navigate }: { data: TPlayer[], navigate: any }) {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<string>("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [playersData, setPlayersData] = useState<TPlayer[]>(data);
    const [origPlayersData, setOrigPlayersData] = useState<TPlayer[]>(data);
    const [searchTerm, setSearchTerm] = useState(
      readFromStorage("searchTerm") ?? ""
    );
    const [filterType, setFilterType] = useState(
      readFromStorage("filterType") ?? ""
    );
    const columns = ['name', 'rank', 'type', 'points', 'description'];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = playersData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(playersData.length / pageSize);

    const returnFilteredData = useCallback(() => {
      const filteredData = origPlayersData
        .filter((item) => {
          const itemName = item?.name;
          return itemName?.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .filter((item) => (filterType ? item.type === filterType : true));
      return filteredData;
    }, [filterType, searchTerm]);

    useEffect(() => {
      const sorted = data.slice().sort((a: any, b: any) => {
        if (sortKey) {
          const aValue = a[sortKey];
          const bValue = b[sortKey];
          if (sortDirection === "asc") {
            return aValue < bValue ? -1 : 1;
          } else {
            return bValue < aValue ? -1 : 1;
          }
        }
        return 0;
      });
      setPlayersData(sorted);
      setOrigPlayersData(sorted);
    }, [data, sortKey, sortDirection]);

    useEffect(() => {
      let filteredData: TPlayer[] = [];
      writeToStorage("searchTerm", searchTerm);
      writeToStorage("filterType", filterType);
      if (searchTerm === "" && filterType === "") {
        filteredData = origPlayersData;
      } else if ((searchTerm && searchTerm !== "") || filterType !== "") {
        filteredData = returnFilteredData();
      }
      setPlayersData(filteredData);
    }, [returnFilteredData, searchTerm, filterType]);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    };

    const getFormatedValue = (key: keyof TPlayer, item: TPlayer) => {
      if(item[key as keyof TPlayer]){
        switch(key){
          case 'dob':
            return (moment(new Date(Number(item['dob']))).format('ll'));
          case 'description':
            const description = `${item['description']?.substring(0, 100)}...`
            return description;
          default:
            return item[key as keyof TPlayer]
        }
      }
      return '';
    }

    return (
      <div className="overflow-x-auto">
        <div className={"flex justify-between items-center my-[10px]"}>
          <div className={"w-[25%]"}>
            <input
              type="text"
              placeholder="Search by name..."
              className={"px-3 py-2 border border-gray-400 rounded w-full"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-[18%]">
            <select
              className="px-3 py-2 border border-gray-400 rounded w-full"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value={PlayerType.BATSMAN}>Batsman</option>
              <option value={PlayerType.BOWLER}>Bowler</option>
              <option value={PlayerType.ALL_ROUNDER}>All Rounder</option>
            </select>
          </div>
        </div>
        {playersData.length > 0 && (
          <div>
            <div className="shadow-lg overflow-hidden">
            <table className="table text-gray-400 border-separate border-spacing-x-0 border-spacing-y-0.5 text-sm">
				        <thead className="bg-gradient-to-r from-[#082e4f] to-[#08243e] text-white">
                  <tr>
                    {columns.map(
                      (key: string, index: number) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer"
                          onClick={() => handleSort(key)}
                        >
                          {String(key).toUpperCase()}
                          {sortKey === key && (
                            <span className="ml-1">
                              {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr className="bg-gradient-to-r from-[#082e4f] to-[#08243e] text-white cursor-pointer">
                    
                      {columns.map((key: any) => (
                        <td
                          key={key}
                          onClick={() => navigate('/player', {state:{playerDetails: paginatedData[index]}})}
                          className={`px-6 py-4 text-white  ${
                            String(item[key as keyof TPlayer] || "").length >
                            100
                              ? "whitespace-normal"
                              : "whitespace-nowrap"
                          } text-sm`}
                        >
                          <div className="flex items-center rounded-[10px]">
                            {key === 'name' && <img
                                src={item.avatar}
                                className="h-[30px] w-[35px] mr-[20px]"
                                alt="Player Avatar"
                            />}
                            <p className="overflow-ellipsis overflow-hidden whitespace-normal">{getFormatedValue(key, item)}</p>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="my-4 flex justify-center">
              <nav className="inline-flex rounded-md shadow bg-gradient-to-r from-[#082e4f] to-[#08243e] text-white">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-transparent text-gray-500 rounded-l-md"
                >
                  {'<'}
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 ${
                      currentPage === i + 1
                        ? "bg-white text-black"
                        : "bg-[#082e4f] text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-transparent text-gray-500 rounded-r-md"
                >
                  {'>'}
                </button>
              </nav>
            </div>
          </div>
        )}
        {playersData.length === 0 && <div className="flex justify-center w-[100%]">
            <p className="text-[26px] text-white font-bold my-[50px]]">No players found with the specified name</p>
        </div>}
      </div>
    );
  };