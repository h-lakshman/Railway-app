import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setCurrentPage } from '../redux/actions';

export default function MyBookings() {
    const [ticketList, setTicketList] = useState([])
    const dispatch = useDispatch()

    const columns = [
        {
            title: 'PNR Number',
            dataIndex: 'pnr_number',
            key: 'pnr_number    ',
        },
        {
            title: 'Train Name',
            dataIndex: 'train_name',
            key: 'train_name',
        },
        {
            title: 'Train Number',
            dataIndex: 'train_number',
            key: 'train_number',
        },
        {
            title: 'Number of Passengers',
            dataIndex: 'people_count',
            key: 'people_count',
        },
        {
            title: 'Passenger Name',
            dataIndex: 'passenger_name',
            key: 'passenger_name',
        },
    ]
    useEffect(() => {
        async function getTickets() {
            const request = await fetch("http://127.0.0.1:8000/get-tickets/", {
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token"),
                },
                method: "GET",
            });
            const response = await request.json()
            if (response.error) {
                localStorage.clear()
                dispatch(setAuthenticated(false))
                dispatch(setCurrentPage('Home'))
            }
            setTicketList(response.ticket_list)
        }   
        getTickets()
    }, [])
    return (
        <div className="flex flex-col  items-center justify-center">
            <div className="Rastaglion text-3xl m-2 font-semibold text-shadow bg-opacity-50 text-black">
                My Bookings
            </div>
            <div>
                <Table dataSource={ticketList} columns={columns} />
            </div>
        </div>
    )
}
