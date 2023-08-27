import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/ticket/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';
import { motion } from 'framer-motion';

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector((state) => state.ticket);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTickets());

        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton url={'/'} />
            <h1>Ticket</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Products</div>
                    <div>ُStatus</div>
                    <div></div>
                </div>

                {tickets.map((ticket, index) => (
                    <motion.div
                        key={ticket._id}
                        initial={{
                            opacity: 0,
                            y: -10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: index * 0.1, // Delay each ticket item by 0.1 seconds
                            },
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                        }}
                    >
                        <TicketItem ticket={ticket} />
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default Tickets;