import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset } from '../features/ticket/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';


function Ticket() {
    const { ticket, isSuccess, isError, isLoading, message } = useSelector((state) => state.ticket);
    const dispatch = useDispatch();
    const params = useParams();
    const { ticketId } = params;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));

        //eslint-disable-next-line
    }, [isError, message, ticketId]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something went wrong</h3>;
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header fade-in">
                <BackButton url={'/tickets'} />

                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
        </div>
    );
}

export default Ticket;