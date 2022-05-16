import React, { useState, useEffect } from 'react'
import ax from '../../ax'
import history from "../../history"
import DeviceForm from './DeviceForm'
const DeviceUpdate = (props) => {
    const { id } = props.match.params
    const [deviceData, setDeviceData] = useState([])
    const userSite = localStorage.getItem("site")

    const getDevice = async () => {
        const res2 = await ax.get(`/devices/${id}`)
        setDeviceData(res2.data)
    }
    useEffect(() => {
        getDevice()
    }, [])

    const onSubmit = async data => {
        await ax.put(`/devices/${id}`, {
            deviceid: data.deviceid,
            location: data.location,
            type: data.type,
            allowedsites: data.allowedsites,
            operations: data.operations,
            mobilecharging: data.mobilecharging,
            site: userSite,
            price:parseFloat(data.price)
        }).catch(err => { alert(err) })
            .then((res) => console.log(res))
            .finally(() => {
                history.goBack()
            })
    }
    return (
        <div className='container'>
            <button className='d-block border-0 px-4 py-1 rounded' style={{ backgroundColor: "#ff9911" }} onClick={() => history.goBack()}>Geri</button>
            <label className='d-block text-center fs-4' style={{}}>Cihaz bilgi güncelleme</label>
            <DeviceForm initialValues={deviceData} onSubmit={onSubmit} />
        </div>
    )
}

export default DeviceUpdate