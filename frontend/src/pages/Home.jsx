import React from 'react'
import { Link } from "react-router-dom"
import { FaRegQuestionCircle, FaTicketAlt } from "react-icons/fa"
import { motion } from "framer-motion"
function Home() {
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
                    What do you need help with?
                </h1>
                <p>Please choose from an option below</p>
            </section>
            <Link className='btn btn-reverse btn-block' to={"/new-ticket"}>
                <FaRegQuestionCircle />
                Create New Ticket
            </Link>
            <Link className='btn btn-block' to={"/tickets"}>
                <FaTicketAlt />
                View My Ticket
            </Link>
        </motion.div>
    )
}

export default Home