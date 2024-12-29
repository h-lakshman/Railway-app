import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage, setIsRegistered } from '../redux/actions'

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [exists, setExists] = useState(false)
    const [invalidCredentials, setInvalidCredentials] = useState(true)
    const dispatch = useDispatch();

    const onUserRegisterSuccessfully = () => {
        dispatch(setIsRegistered(true))
        dispatch(setCurrentPage('HomePage'));

    };
    function setUserRegistration(e) {
        if (e.target.name == "first_name") {
            setFirstName(e.target.value)
        }
        else if (e.target.name == "last_name") {
            setLastName(e.target.value)
        } else if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        else if (e.target.name == "phone_number") {
            setMobile(e.target.value)
        }
        else if (e.target.name == "password") {
            setPassword(e.target.value)
        } else if (e.target.name == "cpassword") {
            setCPassword(e.target.value)
        }
    }

    async function formSubmit() {
        const request = await fetch("http://127.0.0.1:8000/register-user/", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone_number": mobile,
                "password": password,
                "cpassword": cpassword
            })
        })
        const response = await request.json()
        if (response.isRegistered) {

            onUserRegisterSuccessfully()
        }
        if (!(response.isPassword)) {
            setInvalidCredentials(true)
        }
        if (response.exists) {
            setExists(true)
        }

    }


    return (
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6 bg-gray-500 bg-opacity-60">
            <div
                className="text-center mb-16  Rastaglion text-indigo-950 font-alexaniri text-6xl text-white font-semibold text-shadow m-2">
                <div>
                    Welcome to Railway Yatra
                </div>
                <h4 className="text-white font-semibold  text-base mt-6">Sign up into your account</h4>
            </div>
            {invalidCredentials ? null : (<div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
                Passwords donot match!
            </div>)}

            {exists ? <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
                {"User with this email already exists"}
            </div> : null}
            <div>
                <div className=" grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-white font-semibold  text-sm mb-2 block">First Name</label>
                        <input name="first_name" type="text" id="first_name" onChange={setUserRegistration}
                            className="bg-gray-100 w-full text-white font-semibold  text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter first name" />
                    </div>
                    <div>
                        <label className="text-white font-semibold  text-sm mb-2 block">Last Name</label>
                        <input name="last_name" type="text" id="last_name" onChange={setUserRegistration}
                            className="bg-gray-100 w-full text-white font-semibold  text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter last name" />
                    </div>
                    <div>
                        <label className="text-white font-semibold  text-sm mb-2 block">Email Id</label>
                        <input name="email" type="text" id="email" onChange={setUserRegistration}
                            className="bg-gray-100 w-full text-white font-semibold  text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter email" />
                    </div>
                    <div>
                        <label className="text-white font-semibold  text-sm mb-2 block">Mobile No.</label>
                        <input name="phone_number" type="text" id="phone_number" onChange={setUserRegistration}
                            className="bg-gray-100 w-full text-white font-semibold  text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter mobile number" />
                    </div>
                    <div>
                        <label className="text-white font-semibold  text-sm mb-2 block">Password</label>
                        <input name="password" type="password" id="password1" onChange={setUserRegistration}
                            className="bg-gray-100 w-full text-white font-semibold  text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter password" />
                    </div>
                    <div>
                        <label className="text-white font-semibold  text-sm mb-2 block">Confirm Password</label>
                        <input name="cpassword" type="password" id="password2" onChange={setUserRegistration}
                            className="bg-gray-100 w-full text-white font-semibold  text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter confirm password" />

                    </div>
                </div>
                <div className="!mt-12">
                    <button type="submit" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600
        hover:bg-blue-700 focus:outline-none" onClick={formSubmit}>
                        Sign up
                    </button>
                </div>

            </div>
        </div>
    )
}
