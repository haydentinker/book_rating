import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { setAuth } from "../context/AuthContext";
import axios from "axios";
const loginURL = 'http://localhost:5555/auth/login'
export const Login = () => {
    const setToken=setAuth()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handlelogin = async (event) => {
        event.preventDefault();
        const data = {
            "password": password,
            "email": email
        }
        try {
            const response = await axios.post(loginURL, data);
            const newToken = response.data['token'];
            setToken(newToken)
            enqueueSnackbar('Successfully logged in!', { variant: 'success' })
            navigate('/');
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Error occurred when signing up please try again.', { variant: 'error' })

        }
    }
    return (
        <div >
            <h1 className="text-center m-0 bg-slate-600 py-20 text-4xl font-bold text-white">Login</h1>
            <form onSubmit={handlelogin} className="p-20 bg-white rounded-10 font-poppins flex items-center justify-center flex-col">
               
                <label className="block text-14 text-gray font-poppins" htmlFor="email">
                    Email:
                </label>
                <input
                    className="p-3 border border-black rounded-5 text-16"
                    type="text"
                    value={email} onChange={((e) => setEmail(e.target.value))}
                />
                <label className="block text-14 text-gray font-poppins" htmlFor="password">
                    Password:
                </label>
                <input
                    className="p-3 border border-black rounded-5 text-16"
                    type="password"
                    value={password} onChange={((e) => setPassword(e.target.value))}
                />
                <input
                    className="w-half mt-10 p-4 bg-slate-400 border-none text-white text-16 font-bold rounded-5 cursor-pointer shadow-md transition-bg-0.3s-ease"

                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
};
