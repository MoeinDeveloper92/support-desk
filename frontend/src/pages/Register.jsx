import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"


function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData

    //etract data from slice
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        //if there is any error show below
        if (isError) {
            //this message comes from api
            toast.error(message)
        }
        //Redirect the user
        if (isSuccess || user) {
            navigate("/")
        }
        dispatch(reset())

    }, [navigate, isError, dispatch, message, isSuccess, user])


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Passwords don't match")
        } else {
            dispatch(register({ name, email, password }))
        }
    }


    return (
        <motion.div
            initial={{
                x: "-100%"
            }}
            animate={{
                x: "0"
            }}
        >
            <section className="heading">
                <h1>
                    <FaUser />
                    Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id='name'
                            name='name'
                            onChange={handleChange}
                            value={name}
                            required
                            placeholder='Enter Name'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id='email'
                            name='email'
                            onChange={handleChange}
                            value={email}
                            required
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password'
                            name='password'
                            onChange={handleChange}
                            value={password}
                            placeholder='Enter Password'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password2'
                            name='password2'
                            onChange={handleChange}
                            value={password2}
                            placeholder='Confirm Password'
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block" type='submit'>Submit</button>
                    </div>
                </form>
            </section>
        </motion.div>
    )
}

export default Register