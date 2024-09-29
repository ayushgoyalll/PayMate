
import { useState } from "react";
import { Bottomwarning } from "../components/Bottomwarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
    const url=import.meta.env.VITE_BACKEND;
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="gradient h-screen"  >
            <div className="flex flex-col justify-center">
                <div className="rounded-xl bg-white w-80 text-center p-2 shadow-2xl h-max px-4">
                    <Heading label={"Sign up"}></Heading>
                    <Subheading label={"Enter your information to create an account"}></Subheading>
                    <InputBox onChange={e => { setFirstname(e.target.value) }} label={"First Name"} placeholder={"john"} ></InputBox>
                    <InputBox onChange={e => { setLastname(e.target.value) }} label={"Last Name"} placeholder={"doe"} ></InputBox>
                    <InputBox onChange={e => { setUsername(e.target.value) }} label={"E-mail"} placeholder={"johndoe@gmail.com"} ></InputBox>
                    <InputBox onChange={e => { setPassword(e.target.value) }} label={"Password"} placeholder={"123456"} ></InputBox>
                    <Button onClick={async () => {
                        try {
                            const response = await axios.post(`${url}/api/v1/user/signup`, {
                                username,
                                firstname,
                                lastname,
                                password
                            });
                            console.log(response.data.message);
                            localStorage.setItem("token", response.data.token);
                                navigate("/dashboard"); 
                        } catch (error) {
                            console.error("Error during signup:", error);
                            alert("Signup failed. Please try again.");
                        }
                    }
                    } label={"Sign Up"}></Button>
                    <Bottomwarning label={"already have an account?"} to={"/signin"} buttonText={"Sign in"}></Bottomwarning>
                </div>

            </div>


        </div>
    )

}

export default Signup;