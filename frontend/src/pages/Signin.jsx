import { useState } from "react";
import { Bottomwarning } from "../components/Bottomwarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signin()
{
    const url=import.meta.env.VITE_BACKEND;
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <div className="gradient h-screen">
            <div className="flex flex-col justify-center">
            <div className="rounded-xl bg-white w-80 text-center p-2  shadow-2xl h-max px-4">
        <Heading label={"Sign in"}></Heading>
        <Subheading label={"enter your credentials to signin"}></Subheading>
        <InputBox onChange={(e) =>
            {
                setUsername(e.target.value);
            }
        } label={"E-mail"} placeholder={"johndoe@gmail.com"}></InputBox>
        <InputBox onChange={(e) =>
            {
                setPassword(e.target.value);
            }
        } label={"Password"} placeholder={"12345"}></InputBox> 
        <Button onClick={ async() =>
            {
              const response = await  axios.post(`${url}/api/v1/user/signin`,{
                    username,
                    password
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("name", response.data.name);
                
                navigate("/dashboard"); 
            }
        } label={"Sign in"}></Button>
        <Bottomwarning label={"don't have an account?"} to={"/signup"} buttonText={"signup"}></Bottomwarning>
            </div>
        
     </div>
     </div>
    )

}
export default Signin;