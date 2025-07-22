import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LeaderBoard()
{
    const navigate=useNavigate();
    const [topThree,setTopThree]=useState([]);
    const [others,setOthers]=useState([]);

    const fetchData=async () => {
        try {
            const queryData=await axios.get("http://localhost:8080/api");
            const sortedData = queryData.data.sort((a, b) => b.points - a.points);
            setTopThree(sortedData.slice(0,3));
            setOthers(sortedData.slice(3));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>
    {
        fetchData();
    },[]);

    return(
        <>
            <button onClick={(e)=>
                {
                    e.preventDefault();
                    navigate("/")
                }
            } className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded transition">Back</button>
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-yellow-600">
                🏆 Monthly Leaderboard
                </h2>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-2 mb-8 text-center">
                {topThree.map((user, index) => {
                    const medalColors = ["silver", "gold", "bronze"];
                    const positionStyle = [
                    "pt-6", // 2nd
                    "pt-0", // 1st (tallest)
                    "pt-10" // 3rd
                    ];
                    return (
                    <div
                        key={user._id}
                        className={`bg-white rounded-xl shadow-md border p-2 ${positionStyle[index]} flex flex-col items-center`}
                    >
                        <div className="text-xl font-bold text-gray-700">{index + 1}</div>
                        <div className="text-sm font-semibold mt-2">
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                        </div>
                        <div className="text-yellow-600 text-lg font-bold mt-1">
                        {user.points} ⭐
                        </div>
                    </div>
                    );
                })}
                </div>

                {/* Other Users */}
                <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
                {others.map((user, index) => (
                    <div
                    key={user._id}
                    className="flex justify-between items-center border-b py-2 last:border-none"
                    >
                    <span className="font-medium text-gray-700">
                        {index + 4}.{" "}
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </span>
                    <span className="font-bold text-yellow-600">{user.points} ⭐</span>
                    </div>
                ))}
                </div>
            </div>
            </>

    )
}

export default LeaderBoard;