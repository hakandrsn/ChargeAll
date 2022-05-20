import React, { useState, useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import ax from '../../ax'
import Select from "react-select"
const UserForm = (props) => {
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: useMemo(() => {
            return props.initialValues
        }, [props.initialValues])
    })
    const [deviceData, setDeviceData] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const res = await ax.get('/devices')
            setDeviceData(res.data)
        }
        getUser()
    }, [])
    useEffect(() => {
        reset(props.initialValues);
    }, [props.initialValues]);
    const onSubmit = (data) => {
        props.onSubmit(data)
    }
    const renderData = () => {
        return deviceData.map(item => {
            return {
                value: item.deviceid,
                label: item.deviceid
            }
        })
    }
    return (
        <form className="row g-3" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="col-md-12">
                <label htmlFor="ad" className="form-label">Ad soyad</label>
                <input  {...register("username")} name="username" type="text" className="form-control" placeholder='Alex jorgovic' />
            </div>
            <div className="col-12">
                <label htmlFor="password" className="form-label">Şifre</label>
                <input name="password" {...register("password")} type="text" className="form-control" id="password" placeholder="******" />
            </div>
            <div className="col-md-12">
                <label htmlFor="userid" className="form-label">Kullanıcı id</label>
                <input name="userid" {...register("userid")} type="text" className="form-control" id="userid" placeholder='Kullanıcı id' />
            </div>
            <div className="col-md-12">
                <label htmlFor="kartno" className="form-label">Kart No</label>
                <input name="cartid" {...register("cardid")} type="text" className="form-control" id="kartno" placeholder='Kart No' />
            </div>
            <div className='col-12'>
                <label htmlFor="devices" className="form-label">Cihaz İd</label>
                <Controller
                    control={control}
                    defaultValue={renderData().map(c => c.value)}
                    name="devices"
                    render={({ field: { onChange, value, ref } }) => (
                        <Select
                            inputRef={ref}
                            value={renderData().filter(c => value.includes(c.value))}
                            onChange={val => onChange(val.map(c => c.value))}
                            options={renderData()}
                            isMulti
                            placeholder="Cihaz id"
                        />
                    )}
                />
            </div>
            <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default UserForm