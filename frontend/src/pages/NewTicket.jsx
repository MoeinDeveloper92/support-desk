import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function NewTicket() {
    const { user } = useSelector((state) => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState("iPhone")
    const [description, setDescription] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
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
                            <option value="MacBook">MacBook</option>
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
        </>
    )
}

export default NewTicket