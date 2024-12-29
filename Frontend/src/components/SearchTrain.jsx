import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Table, Alert } from 'antd';
import Spinner from './spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function SearchTrain() {
    const [noTrains, setNoTrains] = useState(false)
    const [todayTrains, setTodayTrains] = useState(true)
    const [trainSelect, setTrainSelect] = useState('')
    const [peopleCount, setPeopleCount] = useState('')
    const [journeyDate, setDate] = useState('')
    const [bookingConfirmed, setBookingConfirmed] = useState(false)
    const [enableSpinner, setEnableSpinner] = useState(false)
    const trainList = useSelector((state) => state.trainList);

    const columns = [
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
            title: 'Departure Station',
            dataIndex: 'from_station',
            key: 'from_station',
        },
        {
            title: 'Departure Time',
            dataIndex: 'departure_time',
            key: 'departure_time',
        },
        {
            title: 'Arrival Station',
            dataIndex: 'to_station',
            key: 'to_station',
        },
        {
            title: 'Destination time',
            dataIndex: 'arrival_time',
            key: 'arrival_time',
        },
        {
            title: 'Availble Seats',
            dataIndex: 'available_seats',
            key: 'available_seats',
        },
    ]
    const trainSet = (e) => {
        setTrainSelect(e)
    }
    const dateSet = (e) => {
        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setDate(formattedDate);
        } else {
            setDate('');
        }

    }
    const inputSet = (e) => {
        setPeopleCount(e.target.value)
    }
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    let desired_trains = trainList.desired_trains
    let trains = trainList.available_trains
    let train_dropdown = []
    if (trains) {
        train_dropdown = trains.map((train, i) => {
            return {
                key: i + 1,
                value: train.train_name + ' - ' + train.train_number,
                label: train.train_name + ' - ' + train.train_number,
            }
        })
    }
    const BookingFormSubmit = async () => {
        const request = await fetch("http://127.0.0.1:8000/book-tickets/", {
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
            method: "POST",
            body: JSON.stringify({
                "train_number": trainSelect.split('-')[1].trim(),
                "people_count": peopleCount,
                "date": journeyDate
            })
        });
        onClose();
        const response = await request.json()
        if (response.Booking_confirmed) {
            setBookingConfirmed(true)
        }
    }
    useEffect(() => {
        if (bookingConfirmed) {
            console.log("hi there")
            setEnableSpinner(true)
            setTimeout(() => {
                console.log("ho")
                setEnableSpinner(false)
                toast.success('Booking Confirmed!Check more details in My Bookings')
            }, 3000)
        }
    }, [bookingConfirmed])
    useEffect(() => {

        if (!desired_trains) {
            if (!trains) {
                setNoTrains(true)
            }
            else {
                setTodayTrains(true)
            }
        }
        else {
            trains.map((train, i) => {
                train["key"] = i + 1
                return train
            })
        }
    }, [])

    return (
        <div className="bg-gray-50 font-[sans-serif] bg-opacity-10 ">
            <div className="min-h-screen flex flex-col items-center justify-center  px-4 ">
                <div className=" w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-black font-bold text-4xl">Train List</h1>
                        <p className="Rastaglion text-sm font-bold text-center text-gray-800 mb-6">
                            Find your journey from one station to another</p>
                    </div>
                    <div className="flex flex-row-reverse justify-start">
                        <button onClick={showDrawer}
                            className="black-amber-500  border border-solid border-pink-500 bg-amber-500 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                        >Book Train Tickets
                        </button>
                        {enableSpinner ? <Spinner /> : null}
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                        <Drawer
                            title="Ticket Booking"
                            width={720}
                            onClose={onClose}
                            open={open}
                            styles={{
                                body: {
                                    paddingBottom: 80,
                                },
                            }}
                            extra={
                                <Space>
                                    <Button onClick={onClose}>Cancel</Button>
                                    <Button onClick={BookingFormSubmit} type="primary">
                                        Submit
                                    </Button>
                                </Space>
                            }
                        >
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="trainn"
                                            label="Train"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select the train',
                                                },
                                            ]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Select a train"
                                                onChange={trainSet}
                                                name="trainn"
                                                label="Train"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={train_dropdown}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="ticketCount"
                                            label="Ticket Count"
                                            onChange={inputSet}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter Number of people',
                                                },
                                            ]}
                                        >
                                            <Input
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please choose the dateTime',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                name="dateTime"
                                                label="DateTime"
                                                onChange={dateSet}
                                                style={{
                                                    width: '100%',
                                                }}
                                                getPopupContainer={(trigger) => trigger.parentElement}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Drawer>
                    </div>
                    {noTrains ? <Alert
                        message="Sorry!There are no trains availble for your journey!"
                        type="warning"
                        closable
                    /> : ''}
                    {todayTrains ? <Alert
                        message="Sorry!There are no trains availble for your journey!
                        But all the trains available today to other locations are listed "
                        type="warning"
                        closable
                    /> : ''}
                    <div className="">
                        <Table dataSource={trains} columns={columns} />
                    </div>


                </div>
            </div>
        </div>
    )
}

