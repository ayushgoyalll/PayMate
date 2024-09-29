import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";


function Dashboard()
{
      const url=import.meta.env.VITE_BACKEND;
    const [balance,setBalance]=useState(0);
    useEffect(() => {
        axios.get(`${url}/api/v1/user/getName`,  {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
        } )
            .then(response => {
                console.log(response.data);
                  localStorage.setItem("name",response.data.username);
                  localStorage.setItem("id",response.data.userId);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${url}/api/v1/account/balance`,  {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
        } )
            .then(response => {
                 setBalance(response.data.balance);
               
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }, [balance]);



  
    return(
        <div>
        <div>
        <Appbar username={localStorage.getItem("name")} ></Appbar>
        </div>
        <div className="m-8">
            <Balance value={balance}></Balance>
        </div>
        <Users></Users>
        </div>
    )

}
export default Dashboard;