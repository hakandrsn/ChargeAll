import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

const DeviceForm = (props) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return props.initialValues
        }, [props.initialValues])
    })
    useEffect(() => {
        reset(props.initialValues);
    }, [props.initialValues]);
    const onSubmit = (data) => {
        props.onSubmit(data)
    }

    return (
        <form className="row g-3" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="col-md-12">
                <label htmlFor="price" className="form-label">Dakika başına ücret</label>
                <input  {...register("price")} name="price" type="text" className="form-control" placeholder='Yeni birim ücreti' />
            </div>
            <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default DeviceForm