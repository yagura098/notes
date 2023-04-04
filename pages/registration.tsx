import { NextPage } from "next";
import React, { useState } from "react";

interface FormData {
    username: string
    password: string
    id: string
}

const Registration: NextPage = () => {
    const [form, setForm] = useState<FormData>({username: '', password: '', id: ''})

    async function create(data: FormData) {
        try {
            fetch('http://localhost:3000/api/register', {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(() => setForm({username: '', password: '', id: ''}))
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (data: FormData) => {
        try {
            create(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                        <h3 className="text-4xl font-bold text-purple-600">
                            Sign Up
                        </h3>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={e => {
                        e.preventDefault()
                        handleSubmit(form)
                    }}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Username
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={e => setForm({...form, username: e.target.value})}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={e => setForm({...form, password: e.target.value})}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <a className="text-purple-600 hover:underline" href="#">
                                Log in
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;