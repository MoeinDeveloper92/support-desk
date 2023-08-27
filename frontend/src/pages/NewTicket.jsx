import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { motion } from "framer-motion"


function NewTicket() {
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState("iPhone")
    const [description, setDescription] = useState("")


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate("/tickets")
        }

        dispatch(reset())
    }, [dispatch, navigate, isError, isSuccess, message])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({ description, product }))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <motion.div
            initial={{
                y: "-100%"
            }}
            animate={{
                y: "0"
            }}
        >
            <BackButton url={"/"} />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please Fill Out The Form Below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        value={name}
                        disabled
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="form-control"
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select onChange={(e) => setProduct(e.target.value)} value={product} name="product" id="product">
                            <option value="iPhone">iPhone</option>
                            <option value="MacBook Pro">MacBook</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea name="description" id="description" className='form-contorl' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>


                    <div className="form-group">
                        <button className='btn btn-block' type='submit'>Submit</button>
                    </div>
                </form>
            </section>
        </motion.div>
    )
}

export default NewTicket