import React, { useEffect, useState } from 'react'

export default function PNR() {
  const [pnr, setPnr] = useState('')
  const [pnrNumber, setPnrNumber] = useState('')
  const setPnrNumberfn = (e) => {
    console.log(e)
    setPnrNumber(e.target.value)
  }
  async function getPnr() {
    const request = await fetch(`http://127.0.0.1:8000/check-status/?pnr=${pnrNumber}`, {
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('token')
      },
      method: "GET"
    });
    const response = await request.json()
    if (!response.error) {
      let value = (
        <>
          <strong>PNR Number:</strong>{response.ticket.pnr_number}<br />
          <strong>Status:</strong> <span>{response.ticket.status}</span><br />
          <strong>Train Number:</strong> {response.ticket.train_number}<br />
          <strong>From:</strong> {response.ticket.from_station}<br />
          <strong>To:</strong> {response.ticket.to_station}<br />
          <strong>Date:</strong> {response.ticket.date}<br />
          <strong>Passenger Name:</strong> {response.ticket.passenger_name}
        </>
      )
      setPnr(() => value)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
        <h2 className="Rastaglion text-4xl font-bold text-center text-gray-800 mb-6">PNR Status Checker</h2>
        <div id="pnrForm">
          <div className="mb-6">
            <label htmlFor="pnrInput" className="block text-gray-700 text-lg">Enter PNR Number:</label>
            <input type="text" id="pnrInput" onChange={setPnrNumberfn}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required />
          </div>
          <button type="submit" onClick={getPnr}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105">Check
            Status</button>
        </div>
        <div id="pnrResult" className="mt-6">
          <div className="bg-gray-100 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800">PNR Details:</h3>
            <p id="pnrData" className="text-gray-700 mt-3">{pnr}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
