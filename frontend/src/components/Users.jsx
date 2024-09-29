import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import axios from "axios";

export const Users = () => {
    const url=import.meta.env.VITE_BACKEND;
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");
 //   const [current,setCurrent]=useState(0);
    useEffect(() => {
        axios.get(`${url}/api/v1/user/bulk?filter=${filter}`)
            .then(response => {
                // Assuming response.data.user is an array of user objects
                const sortedUsers = response.data.user.sort((a, b) => a.firstname.localeCompare(b.firstname));
                setUsers(sortedUsers);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, [filter]);
     const currentUserId=localStorage.getItem("id");

   
    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e) =>{
                    setFilter(e.target.value)
                }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded-xl"></input>
            </div>
            <div>
                {
                
               // users.map(user => <User key={user._id} user={user} />)
                users
                    .filter(user => user._id !== currentUserId)
                    .map(user => (
                        <User key={user._id} user={user} />
                    ))
                }
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 gradient flex justify-center mt-1 mr-2 border-2 border-grey-500">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname ? user.firstname[0].toUpperCase() : 'U'}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstname[0].toUpperCase() + user.firstname.substring(1)} {user.lastname[0].toUpperCase() + user.lastname.substring(1)}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button onClick={(e) =>
                    {
                        navigate("/sendmoney?id=" + user._id + "&name=" + user.firstname)
                    }
                } label={"Send Money"} />
            </div>
        </div>
    );
}
