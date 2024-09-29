import axios from "axios";
import { Button } from "../components/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sendmoney() {
    const url=import.meta.env.VITE_BACKEND;
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name") || ""; // Default to an empty string if name is null

    const handleTransfer = () => {
        axios.post(
            `${url}/api/v1/account/transfer`,
            {
                to: id,
                amount: parseFloat(amount), // Parse amount to ensure it's a number
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"), // Ensure space after "Bearer"
                },
            }
        )
        .then(response => {
            alert("Transfer successful!"); // Show success alert
            navigate("/dashboard"); // Redirect to the dashboard
        })
        .catch(error => {
            console.error("Error initiating transfer:", error);
            alert("insufficient balance!. Please try again.");
            navigate("/dashboard");
            
            

             // Show error alert
        });
    };

    return (
        <div className="flex justify-center h-screen gradient">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full gradient flex items-center justify-center">
                                <span className="text-2xl">{name ? name[0].toUpperCase() : ''}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    min="0" // Optional: restrict to positive values
                                />
                            </div>
                            <Button onClick={handleTransfer} label={"Initiate Transfer"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
