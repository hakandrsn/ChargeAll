import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import location from "../../assets/images/location.png"
import Modal from '../../modal/Modal';


const GoogleMap = ({ devices }) => {
    const [show, setShow] = useState(false)
    const mapsData = {
        location: { lat: 39.19985299873145, lng: 33.53684485914165 },
        zoom: 7
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
                content={text.site}
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