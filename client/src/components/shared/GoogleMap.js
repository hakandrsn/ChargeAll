import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import location from "../../assets/images/location.png"
import Modal from '../../modal/Modal';
import date from "date-and-time"
import { useAuth } from '../../context/AuthContext';

const GoogleMap = ({ devices }) => {
    const { deviceLoc } = useAuth()
    const [show, setShow] = useState(false)
    const mapsData = {
        location: { lat: 39.19985299873145, lng: 33.53684485914165 },
        zoom: 7
    }
    const renderContent = (text) => {
        console.log(text)
        const locArea = deviceLoc && deviceLoc.find(x => x.id === text._id)
        return (
            <div className='d-flex justify-content-center flex-column px-4 mx-auto py-3 rounded'
                style={{ backgroundColor: "#2980b9", color: "black", fontWeight: 500 }}>
               
                <h2 className='mx-auto' style={{color:"blue"}}>{text.devicename}</h2>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>Cihaz İd </span>:
                    <label className='ms-1'>{text.deviceid}</label>
                </div>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>Konum </span>:
                    <label className='ms-1'>{!locArea ? ": Loading" : locArea.value.slice(8)}</label>

                </div>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>Kullanan kullanıcı </span>:
                    <label className='ms-1'>{text.charginguser ? text.charginguser : "Boşta"}</label>
                </div>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>Mobil kullanıcı </span>:
                    <label className='ms-1'>{text.mobilecharging}</label>
                </div>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>site </span>:
                    <label className='ms-1'>{text.site}</label>
                </div>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>tip </span>:
                    <label className='ms-1'>{text.type}</label>
                </div>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>durum </span>:
                    <label className='ms-1'>{text.state == "1" ? "Meşgul" :"Müsait"}</label>
                </div>
                <div className=''>
                    <span className='text-capitalize d-inline-block' style={{ width: 140 }}>dakika ücreti </span>:
                    <label className='ms-1'>{text.price}</label>
                </div>
            </div>
        )
    }
    const Marker = ({ text }) => (
        <div className='position-relative'>
            <img className='mb-2 position-absolute' style={{ bottom: 0, left: 0 }} src={location} width={50} height={50} alt="location" />
            <div onClick={() => { setShow(!show) }} className='d-flex flex-column justify-content-center align-items-center position-absolute' style={{ top: -5, left: -7 }}>
                <div className='mb-1 p-1 d-flex flex-column justify-content-center align-items-center rounded' style={{ backgroundColor: "rgba(241, 238, 233,.2)", zIndex: 10 }}>
                    <label className='fw-bolder' style={{ fontSize: 13 }}>{text.site}</label>
                </div >
                <div className='d-flex rounded px-1 justify-content-evenly' style={{ backgroundColor: "rgba(241, 238, 233,.9)", zIndex: 10 }}>
                    <label>{text.type}</label>
                    <label className='mx-1'>-</label>
                    <label style={{ color: `${text.state == "1" ? "tomato" : "green"}`, fontWeight: 600 }}>{text.state == "1" ? "Meşgul" : "Müsait"}</label>

                </div>
            </div>
            {show && <Modal
                title="Cihaz konum bilgileri"
                onDismiss={() => setShow(!show)}
                content={renderContent(text)}
            />}
        </div>
    )
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBPeeSwsoJ6yA5A_PFz51wrQd4SVLcJdDU" }}
            defaultCenter={mapsData.location}
            defaultZoom={mapsData.zoom}
        >
            {
                devices && devices.map((device, i) => {

                    const ll = device.location.split(",")
                    return (
                        <Marker key={i} lat={Number(ll[0])} lng={Number(ll[1])} text={device} />
                    )
                })
            }
        </GoogleMapReact>
    )
}

export default GoogleMap