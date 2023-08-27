import axios from "axios"
const API_URL = "/api/tickets/"


//Create new Ticket
const createTicket = async (ticketData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)
    return response.data
}


//Get all tickets
const getTickets = async (token) => {
    //send request to api  to get all the user;s ticket
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const ticketService = {
    createTicket,
    getTickets
}


export default ticketService