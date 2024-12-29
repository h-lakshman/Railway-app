import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../redux/actions';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const dispatch = useDispatch();

  const onUserLoginSuccessfully = (token) => {
    localStorage.setItem("token", token);
    dispatch(setAuthenticated(true));
  };
  const setLoginForm = (e) => {
    if (e.target.name == "username") {
      console.log(e.target.value)
      setEmail(e.target.value)
    }
    else if (e.target.name == "password") {
      console.log(e.target.value)
      setPassword(e.target.value)
    }
  }

  const submitLoginForm = async () => {
    const request = await fetch("http://127.0.0.1:8000/login/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })
    const response = await request.json()

    if (response.isLoggedIn) onUserLoginSuccessfully(response.token)
    if (response.invalid_credentials) setInvalidCredentials(true)
  }

  return (
    <div className="bg-gray-50 font-[sans-serif] bg-opacity-10">
      <div className="min-h-screen flex flex-col items-center justify-center py-0 px-4">
        <div className="max-w-md w-full">
          <div
            className="text-center mb-13  Rastaglion text-black font-alexaniri text-6xl  font-semibold text-shadow m-2">
            <div>
              Welcome to Railway Yatra
            </div>
          </div>

          <div className="px-8 py-4 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            {invalidCredentials ? <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
              Invalid username or password. Please try again.
            </div> : null}
            <div className="mt-8 space-y-4" method="post">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <input name="username" type="text" required onChange={setLoginForm}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                    className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type="password" required onChange={setLoginForm}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>


              <div className="!mt-8">
                <button type="submit" onClick={submitLoginForm}
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" >
                  Sign in
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="/register-user"
                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

