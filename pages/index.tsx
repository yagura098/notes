import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { prisma } from '../lib/prisma'
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import jwtDecode from 'jwt-decode';

// interface Users {
//     users: {
//         id: string
//         username: string
//         password: string
//     }[]
// }



// const Login = ({users}: Users) => {
function Login() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const router = useRouter()

    const onSubmit = () => {
        
        const data = {
            username: Username,
            password: Password,
        };
        
        console.log("bangmessi");
        axios.post("http://localhost:3000/api/login", data).then((response) => {
            localStorage.setItem("usertoken", response.data.data);
            const payload = jwtDecode(response.data.data);
            console.log(payload);
            console.log(payload['id']);
            router.push("/user/" + payload['id'])
        }).catch((error) => {console.log(error);});

        
        // axios.get("http:localhost:3000/home")
    }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-gray-50 rounded-md shadow-md lg:max-w-md">
                <div>
                        <h3 className="text-4xl font-bold text-purple-600 text-center">
                            Sign Up
                        </h3>
                </div>
                <form className="mt-6" onSubmit={e => {e.preventDefault()}}>
                    <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name='username'
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button onClick={onSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Dont have an account?{" "}
                    <a
                        href="registration"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
            {/* Tampil data user
            <ul>
          {users.map(user => (
            <li key={user.id}>
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{user.username}</h3>
                  <p className="text-sm">{user.password}</p>
                </div>
              </div>
            </li>
          ))}
        </ul> */}
        </div>
  )
}

export default Login;

// export const getServerSideProps: GetServerSideProps = async () => {
//     const users = await prisma.user.findMany({
//         select: {
//             id: true,
//             username: true,
//             password: true
//         }
//     })

//     return {
//         props: {
//             users
//         }
//     }
// }