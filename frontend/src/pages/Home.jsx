import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Home() {
    return (
        <motion.div
            initial={{
                x: '-100%',
            }}
            animate={{
                x: '0',
                transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                },
            }}
        >
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
                    What do you need help with?
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
                    Please choose from an option below
                </motion.p>
            </section>
            <Link
                className="btn btn-reverse btn-block"
                to="/new-ticket"
                style={{
                    position: 'relative',
                }}
            >
                <motion.span
                    className="icon"
                    initial={{
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delay: 0.6,
                        },
                    }}
                >
                    <FaRegQuestionCircle />
                </motion.span>
                Create New Ticket
            </Link>
            <Link
                className="btn btn-block"
                to="/tickets"
                style={{
                    position: 'relative',
                }}
            >
                <motion.span
                    className="icon"
                    initial={{
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delay: 0.8,
                        },
                    }}
                >
                    <FaTicketAlt />
                </motion.span>
                View My Ticket
            </Link>
        </motion.div>
    );
}

export default Home;