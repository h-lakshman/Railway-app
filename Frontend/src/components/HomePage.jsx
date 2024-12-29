import React, { useEffect, useState } from 'react'
import { DatePicker, Alert } from "antd";
import { setCurrentPage, setIsRegistered, setTrainList } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import toast, { useToaster } from 'react-hot-toast';

export default function HomePage() {
    const [from, setFrom] = useState('TCR-Thrissur')
    const [to, setTo] = useState('KCVL-Trivandrum Kochuveli')
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const dispatch = useDispatch();
    const isRegistered = useSelector((state) => state.isRegistered);
    console.log("here", isRegistered)

    const redirectToLogin = () => {
        dispatch(setCurrentPage('LoginPage'));
    };
    function changeValues(e) {
        if (e.target.name == "from") {
            setFrom(() => e.target.value)
        }
        else if (e.target.name == "to") {
            setTo(() => e.target.value)
        }
    }
    const call = async (from, to) => {
        const data = await fetch(`http://127.0.0.1:8000/trains?from=${from}&to=${to}`);
        const trainList = await data.json();
        dispatch(setTrainList(trainList))
        dispatch(setCurrentPage('SearchTrain'));
    };

    useEffect(() => {
        console.log('inside effect')
        if (isRegistered) {
            toast.success("Account Created Successfully!Please Login")
        }
    }, [])
    return (
        <div className="flex  flex-col items-start justify-center h-3/4">
            <div className="flex flex-col  items-start justify-center text-white font-semibold text-shadow mt-50  bg-opacity-50 ">
                <div className="Rastaglion text-3xl m-2">
                    SAFETY | SECRUITY | PUNCTUALITY
                </div>
                <div className=" Rastaglion text-indigo-950 font-alexaniri text-6xl text-white font-semibold text-shadow m-2">
                    INDIAN RAILWAYS
                </div>
                <div className="Rastaglion text-3xl text-white font-semibold text-shadow m-2">
                    Heartily enjoy every journey through our boundless hospitality. <br />
                    Through Indian railways, The Lifeline of the Nation.
                </div>


            </div>
            <Toaster
                position="top-left"
                reverseOrder={false}
                on
            />
            {isAuthenticated ?
                <div
                    className="ml-250 mt-8 pl-6 py-4 bg-green-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 bg-opacity-60">

                    <div className="w-full flex items-center justify-between" method="get" action="/trains">
                        <select id="from" name="from" onChange={changeValues}
                            className="mx-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected="TCR-Thrissur">TCR-Thrissur</option>
                            <option value="CLT-Kozhikode Main">CLT-Kozhikode Main</option>
                            <option value="ERS-Ernakulam Junction">ERS-Ernakulam Junction</option>
                            <option value="TVC-Trivandrum Central">TVC-Trivandrum Central</option>
                            <option value="AWY-Aluva">AWY-Aluva</option>
                            <option value="QLN-Kollam Junction">QLN-Kollam Junction</option>
                            <option value="PGT-Palakkad Junction">PGT-Palakkad Junction</option>
                            <option value="KYJ-Kayamkulam Junction">KYJ-Kayamkulam Junction</option>
                            <option value="SRR-Shoranur Junction">SRR-Shoranur Junction</option>
                            <option value="CAN-Kannur Main">CAN-Kannur Main</option>
                            <option value="ERN-Ernakulam Town">ERN-Ernakulam Town</option>
                            <option value="KTYM-Kottayam">KTYM-Kottayam</option>
                            <option value="TIR-Tirur">TIR-Tirur</option>
                            <option value="CNGR-Chengannur">CNGR-Chengannur</option>
                            <option value="TLY-Thalassery">TLY-Thalassery</option>
                            <option value="BDJ-Vadakara">BDJ-Vadakara</option>
                            <option value="ALLP-Alappuzha">ALLP-Alappuzha</option>
                            <option value="KCVL-Trivandrum Kochuveli">KCVL-Trivandrum Kochuveli</option>
                            <option value="KGQ-Kasaragod">KGQ-Kasaragod</option>
                            <option value="TRVL-Tiruvalla">TRVL-Tiruvalla</option>
                            <option value="PAY-Payyanur">PAY-Payyanur</option>
                            <option value="KZE-Kanhangad">KZE-Kanhangad</option>
                            <option value="OTP-Ottappalam">OTP-Ottappalam</option>
                            <option value="VAK-Varkala Sivagiri">VAK-Varkala Sivagiri</option>
                            <option value="AFK-Angamaly">AFK-Angamaly</option>
                            <option value="CGY-Changanassery">CGY-Changanassery</option>
                            <option value="KTU-Kuttippuram">KTU-Kuttippuram</option>
                            <option value="QLD-Koyilandy">QLD-Koyilandy</option>
                            <option value="GUV-Guruvayur">GUV-Guruvayur</option>
                            <option value="MVLK-Mavelikara">MVLK-Mavelikara</option>
                            <option value="CKI-Chalakudi">CKI-Chalakudi</option>
                            <option value="KPY-Karunagapalli">KPY-Karunagapalli</option>
                        </select>

                        <select id="to" name="to" onClick={changeValues}
                            className="mx-2 w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected="TCR-Thrissur">TCR-Thrissur</option>
                            <option value="CLT-Kozhikode Main">CLT-Kozhikode Main</option>
                            <option value="ERS-Ernakulam Junction">ERS-Ernakulam Junction</option>
                            <option value="TVC-Trivandrum Central">TVC-Trivandrum Central</option>
                            <option value="AWY-Aluva">AWY-Aluva</option>
                            <option value="QLN-Kollam Junction">QLN-Kollam Junction</option>
                            <option value="PGT-Palakkad Junction">PGT-Palakkad Junction</option>
                            <option value="KYJ-Kayamkulam Junction">KYJ-Kayamkulam Junction</option>
                            <option value="SRR-Shoranur Junction">SRR-Shoranur Junction</option>
                            <option value="CAN-Kannur Main">CAN-Kannur Main</option>
                            <option value="ERN-Ernakulam Town">ERN-Ernakulam Town</option>
                            <option value="KTYM-Kottayam">KTYM-Kottayam</option>
                            <option value="TIR-Tirur">TIR-Tirur</option>
                            <option value="CNGR-Chengannur">CNGR-Chengannur</option>
                            <option value="TLY-Thalassery">TLY-Thalassery</option>
                            <option value="BDJ-Vadakara">BDJ-Vadakara</option>
                            <option value="ALLP-Alappuzha">ALLP-Alappuzha</option>
                            <option value="KCVL-Trivandrum Kochuveli">KCVL-Trivandrum Kochuveli</option>
                            <option value="KGQ-Kasaragod">KGQ-Kasaragod</option>
                            <option value="TRVL-Tiruvalla">TRVL-Tiruvalla</option>
                            <option value="PAY-Payyanur">PAY-Payyanur</option>
                            <option value="KZE-Kanhangad">KZE-Kanhangad</option>
                            <option value="OTP-Ottappalam">OTP-Ottappalam</option>
                            <option value="VAK-Varkala Sivagiri">VAK-Varkala Sivagiri</option>
                            <option value="AFK-Angamaly">AFK-Angamaly</option>
                            <option value="CGY-Changanassery">CGY-Changanassery</option>
                            <option value="KTU-Kuttippuram">KTU-Kuttippuram</option>
                            <option value="QLD-Koyilandy">QLD-Koyilandy</option>
                            <option value="GUV-Guruvayur">GUV-Guruvayur</option>
                            <option value="MVLK-Mavelikara">MVLK-Mavelikara</option>
                            <option value="CKI-Chalakudi">CKI-Chalakudi</option>
                            <option value="KPY-Karunagapalli">KPY-Karunagapalli</option>
                        </select>


                        <DatePicker size="large" style={{ width: "100%" }} />
                        <div className="ml-2 mr-4">
                            <button type="submit" onClick={(_e) => call(from, to)}
                                className="text-white bg-blue-700 hover:bg-blue-800 rounded-md px-5 py-2 text-sm font-medium ml-6 mt-1  ">Search</button>
                        </div>

                    </div>



                </div> : <div className="flex justify-center items-center w-full mt-2">
                    <button type="button" onClick={(e) => { redirectToLogin() }}
                        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l
                    hover:from-teal-200 hover:to-lime-200 focus:ring-4 
                    focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg 
                    text-sm px-5 py-2.5 text-center me-2 mb-2">Login to avail services</button>
                </div>}
        </div>
    )
}



