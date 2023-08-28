import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket } from '../features/ticket/ticketSlice';
import { getNotes, createNote, reset as noteReset } from "../features/notes/noteSlice"
import Modal from "react-modal"
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import NoteItem from '../components/NoteItem';
import { FaPlus } from "react-icons/fa"
const customStyles = {
    content: {
        width: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%)",
        position: "relative"
    }
}

//it will mounted to the root
Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState("")


    const { ticket, isSuccess, isError, isLoading, message } = useSelector((state) => state.ticket);
    //Since we are having isLoading,we have to rename is Loading
    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.note)
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate()
    const { ticketId } = params;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }


        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId))


        //eslint-disable-next-line
    }, [isError, message, ticketId]);

    //Close Ticketr
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success("Ticket Closed")
        navigate("/tickets")
    }

    if (isLoading || notesIsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something went wrong</h3>;
    }

    //open /close modal
    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }


    //Create note submit
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({ noteText, ticketId }))
        closeModal()
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
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {ticket.status !== "closed" && (
                <button onClick={openModal} className='btn '> <FaPlus /> Add Note</button>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
                <h2>
                    Add Note
                </h2>
                <button className='btn-close' onClick={closeModal}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className='form-control'
                            placeholder='note-text'
                            value={noteText} onChange={(e) => setNoteText(e.target.value)} >

                        </textarea>
                    </div>
                    <div className="form-group">
                        <button className='btn' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem note={note} key={note._id} />
            ))}

            {ticket.status !== "closed" && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close</button>
            )}
        </div>
    );
}

export default Ticket;