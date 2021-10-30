import React, { useContext } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { Redirect } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import './CartScreen.scss'

export const CartScreen = () => {

    const {carrito, vaciarCarrito, removeItem, calcularTotal} = useContext(CartContext)

    return (
        <div className="container my-5">
            {
                carrito.length === 0
                ? <>
                    <Redirect to="/" />
                 </>
                :
                    <>
                        <h2>Resumen de compra</h2>
                        <hr/>

                        {
                            carrito.map( (prod) => (
                                <div key={Math.random()} className="itemCarrito">
                                    <p className="itemTitulo">{prod.name}</p>
                                    <p>Cantidad: {prod.cantidad}</p>
                                    <p>Precio: {prod.price * prod.cantidad}</p>
                                    <button className="btn btn-danger" onClick={() => removeItem(prod.id)}>
                                        <BsFillTrashFill/>
                                    </button>
                                </div>
                            ))
                        }

                        <hr/>
                        <h3 className="my-3">Precio total: ${calcularTotal()}</h3>
                        <button
                            className="btn btn-danger"
                            onClick={vaciarCarrito}
                        >
                            Vaciar carrito
                        </button>
                    </>
            } 
        </div>
    )
}
