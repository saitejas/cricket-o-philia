import React, { useCallback, useEffect, useState } from "react";
import getPlayers from "../service/get-players";
import { TPlayer } from "../constants/types";

export default function Players() {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [playersData, setPlayersData] = useState<TPlayer[]>([]);

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

  const PlayersTable = ({ data }: { data: TPlayer[] }) => {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<string>("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [playersData, setPlayersData] = useState<TPlayer[]>(data);
    const [origPlayersData, setOrigPlayersData] = useState<TPlayer[]>(data);
    const [searchTerm, setSearchTerm] = useState('');

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = playersData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(playersData.length / pageSize);

    const returnFilteredData = useCallback(() => {
      const filteredData = playersData.filter((item) => {
        const itemName = item?.name;
        return itemName?.toLowerCase().includes(searchTerm.toLowerCase())
      });
      return filteredData;
    }, [playersData, searchTerm])

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
      const filteredData = searchTerm && searchTerm !== ''
      ? returnFilteredData()
      : origPlayersData;
      setPlayersData(filteredData);

    }, [origPlayersData, playersData, returnFilteredData, searchTerm]);

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

    return (
      <div className="overflow-x-auto">
        <div className={'flex justify-center m-[20px]'}>
          <div className={'w-[80%]'}>
            <input
              type="text"
              placeholder="Search by name..."
              className={'px-3 py-2 border border-gray-400 rounded w-full'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="shadow-lg overflow-hidden border border-gray-300 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                {Object.keys(playersData[0]).map(
                  (key: string, index: number) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer"
                      onClick={() => handleSort(key)}
                    >
                      {String(key)}
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
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  {Object.keys(playersData[0]).map((key: any) => (
                    <td
                      key={key}
                      className={`px-6 py-4 ${
                        String(item[key as keyof TPlayer] || "").length > 100
                          ? "whitespace-normal"
                          : "whitespace-nowrap"
                      } text-sm text-gray-800`}
                    >
                      {item[key as keyof TPlayer] || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-200 text-gray-500 rounded-l-md"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-200 text-gray-500 rounded-r-md"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isDataLoading ? <div></div> : <PlayersTable data={playersData} />}
    </div>
  );
}
