import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/ticket/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { motion } from 'framer-motion';

function NewTicket() {

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket);
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            dispatch(reset());
            navigate('/tickets');
        }

        dispatch(reset());
    }, [dispatch, navigate, isError, isSuccess, message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({ description, product }));
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <motion.div
            initial={{
                y: '-100%',
            }}
            animate={{
                y: '0',
                transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                },
            }}
        >
            <BackButton url={'/'} />
            <section className="heading">
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 0.2,
                        },
                    }}
                >
                    Create New Ticket
                </motion.h1>
                <motion.p
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 0.4,
                        },
                    }}
                >
                    Please Fill Out The Form Below
                </motion.p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" value={name} disabled className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Email</label>
                    <input type="email" value={email} disabled className="form-control" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <motion.select
                            onChange={(e) => setProduct(e.target.value)}
                            value={product}
                            name="product"
                            id="product"
                            initial={{
                                opacity: 0,
                                x: -20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                    delay: 0.6,
                                },
                            }}
                        >
                            <option value="iPhone">iPhone</option>
                            <option value="MacBook Pro">MacBook</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </motion.select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <motion.textarea
                            name="description"
                            id="description"
                            className="form-contorl"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            initial={{
                                opacity: 0,
                                y: -20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: 0.8,
                                },
                            }}
                        ></motion.textarea>
                    </div>

                    <div className="form-group">
                        <motion.button
                            className="btn btn-block"
                            type="submit"
                            initial={{
                                opacity: 0,
                                y: -20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: 1,
                                },
                            }}
                        >
                            Submit
                        </motion.button>
                    </div>
                </form>
            </section>
        </motion.div>
    );
}

export default NewTicket