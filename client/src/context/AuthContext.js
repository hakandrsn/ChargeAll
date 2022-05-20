import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react'
import ax from '../ax'
import history from "../history"
export const Auth = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const userSite = localStorage.getItem("site")
    const [deviceLoc, setDeviceLoc] = useState([])

    let data = []
    useEffect(() => {
        const getLocation = async () => {
            await ax.get(`/devices/bysite/${userSite}`).then(async res => {
                for (let i = 0; i < res.data.length; i++) {
                    const laglng = res.data[i].location.split(",")
                    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${laglng[0]},${laglng[1]}&key=AIzaSyBPeeSwsoJ6yA5A_PFz51wrQd4SVLcJdDU`)
                    const result = response.data
                    data.push({value:result.results[0].formatted_address,id:res.data[i]._id})
                }
                setDeviceLoc(data)
            })
        }
        getLocation()
    }, [])
    const login = (username, password) => {
        setLoading(true)
        ax.post('/login', { username, password }).then((user) => {
            setUser(user)
            localStorage.setItem("admin", user.data[0].adminid)
            localStorage.setItem("site", user.data[0].site)
            localStorage.setItem("username", user.data[0].username)
            localStorage.setItem("adsoyad", user.data[0].adsoyad)
            localStorage.setItem("devices", user.data[0].devices)
        }).catch((err) => { alert(err) }).finally(() => {
            setLoading(false)
            history.push('/')
            window.location.reload()
        })
    }
    const logout = () => {
        window.location.reload()
        localStorage.removeItem("admin")
        localStorage.removeItem("site")
        localStorage.removeItem("username")
        localStorage.removeItem("adsoyad")
        localStorage.removeItem("devices")
    }
    const value = {
        user,
        loading,
        login,
        logout,
        deviceLoc
    }
    return (
        <Auth.Provider
            value={value}
        >
            {children}
        </Auth.Provider>
    )
}

export const useAuth = () => {
    return useContext(Auth)
}
