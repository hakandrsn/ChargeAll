import React from 'react'
import history from '../../history'
import ax from '../../ax'
import UserForm from './UserForm'
import date from "date-and-time"
const NewUser = () => {
    const userSite = localStorage.getItem("site")

    const onSubmit = async (data) => {
        try {
            const postingData = {
                userid: data.userid,
                cardid: data.cardid,
                username: data.username,
                password: data.password,
                balance: 0,
                devices: data.devices,
                operations: [],
                site: userSite,
                date: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            }
            await ax.post("/users", postingData)
        } catch (e) {
            console.log(e)
        } finally {
            history.goBack()
        }
    }
    return (
        <div className='container'>
            <button className='d-block border-0 px-4 py-1 rounded' style={{ backgroundColor: "#ff9911" }} onClick={() => history.goBack()}>Geri</button>
            <label className='d-block text-center fs-4' style={{}}>Kullanıcı Ekle</label>
            <UserForm onSubmit={onSubmit} />
        </div>
    )
}

export default NewUser