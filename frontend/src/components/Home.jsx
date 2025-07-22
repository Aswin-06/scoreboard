import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const [userData,setUserData]=useState([]);
    const [points,setPoints]=useState(0);
    const [showPoints,setShowPoints]=useState(false);
    const [showAddUser,setShowAddUser]=useState(false);
    const [name,setName]=useState("");
    const navigate=useNavigate();

    useEffect(()=>
    {
        fetchUserData();
    },[]);

    const fetchUserData=async () => {
        try {
            const getdata=await axios.get("https://scoreboard-dq8m.onrender.com/api");
            setUserData(getdata.data);
            console.log(getdata.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPoints=async (id) => {
        const newData={"_id":id};
        try {
            const rankData=await axios.post("https://scoreboard-dq8m.onrender.com/api/rank",newData);
            setPoints(rankData.data);
            setShowPoints(true);
        } catch (error) {
            console.log(error);
        }
    }

    const addUser=async (e) => {
        e.preventDefault();
        try {
            if(name==="")
            {
                alert("Enter the name");
                return;
            }
            const data={name:name};
            await axios.post("https://scoreboard-dq8m.onrender.com/api/",data);
            setShowAddUser(false);
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="flex justify-end mb-2">
            <button
                onClick={(e) => {
                e.preventDefault();
                navigate("/leaderboard");
                }}
                className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            >
                Leaderboard
            </button>
        </div>
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Users</h2>

            <div className="space-y-4">
            {userData.map((data) => {
                const formattedName =
                data.name.charAt(0).toUpperCase() + data.name.slice(1);

                return (
                <div
                    key={data._id}
                    className="bg-white border border-gray-200 shadow-md rounded-md p-4 flex items-center justify-between"
                >
                    <h3 className="text-base font-medium text-gray-800">{formattedName}</h3>
                    <button
                    onClick={(e) => {
                        e.preventDefault();
                        getPoints(data._id);
                    }}
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                    >
                    Claim
                    </button>
                </div>
                );
            })}
            </div>

            <div className="mt-6 text-center">
            <button
                onClick={(e) => {
                e.preventDefault();
                setShowAddUser(!showAddUser);
                }}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                Add User
            </button>
            </div>

            {showAddUser && (
            <div className="mt-4 space-y-2 text-center">
                <input
                type="text"
                placeholder="Enter name"
                onChange={(e) => {
                    setName(e.target.value);
                }}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <button
                onClick={addUser}
                className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                Add
                </button>
            </div>
            )}
        </div>

        {showPoints && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-72 text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">{points}</h1>
                <button
                onClick={(e) => {
                    e.preventDefault();
                    setShowPoints(false);
                }}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                >
                Close
                </button>
            </div>
            </div>
        )}
        </>
    )
}

export default Home;