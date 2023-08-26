import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { toast } from "react-toastify"



function Login() {
    const [formData, setFormData] = useState({

        email: "",
        password: "",

    })

    const { email, password, } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
    }, [isError, isSuccess, user, navigate, message, dispatch])
    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))

    }

    if (isLoading) {
        return <Spinner />
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
                    <FaSignInAlt />
                    Login
                </h1>
                <p>Please login to get support.</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>

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
                        <button className="btn btn-block" type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </motion.div>
    )
}

export default Login