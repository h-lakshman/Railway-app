import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import MyBookings from './components/MyBookings';
import Navbar from './components/NavBar';
import PNR from './components/PNR';
import RegisterPage from './components/RegisterPage';
import SearchTrain from './components/SearchTrain';
import { setCurrentPage, setAuthenticated } from './redux/actions';

export default function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const currentPage = useSelector((state) => state.currentPage);

    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            dispatch(setAuthenticated(true));
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setCurrentPage('HomePage'));
        }
    }, [isAuthenticated]);



    const onUserRegisterSuccessfully = () => {
        dispatch(setCurrentPage('HomePage'));
    };

    const call = async (from, to) => {
        const data = await fetch(`http://127.0.0.1:8000/trains?from=${from}&to=${to}`);
        const trainList = await data.json();
        dispatch(setCurrentPage('SearchTrain'));
    };



    const logout = () => {
        localStorage.clear();
        dispatch(setAuthenticated(false));
    };

    // const currentPageSelect = (e) => {
    //     console.log(e)
    //     const navItems = {
    //         'Home': 'HomePage',
    //         'navTrainTickets': 'HomePage',
    //         'navTrainList': 'SearchTrain',
    //         'NavCheckStatus': 'PNR',
    //         'navLogin': 'LoginPage',
    //         'navRegister': 'RegisterPage',
    //         'navMyBookings': 'MyBookings',
    //     };

    //     if (e === "navLogout") {
    //         logout();
    //     } else {
    //         dispatch(setCurrentPage(navItems[e]));
    //     }
    // };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'HomePage':
                return <HomePage />;
            case 'PNR':
                return <PNR />;
            case 'LoginPage':
                return <LoginPage />;
            case 'RegisterPage':
                return <RegisterPage />;
            case 'MyBookings':
                return <MyBookings />;
            case 'SearchTrain':
                return <SearchTrain />
            default:
                return <HomePage />;
        }
    };

    return (
        <>
            <Navbar />
            {renderCurrentPage()}
        </>
    );
}
