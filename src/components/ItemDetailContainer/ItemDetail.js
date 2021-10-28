import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import { ItemCount } from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import './ItemDetail.css';

export const ItemDetail = ( {id, name, price, img, description, freesend, category, stock} ) => {

    const {goBack, push} = useHistory()

    const {addToCart, isInCart} = useContext(CartContext)

    const [cantidad, setCantidad] = useState(1)

    const handleAgregar = () => {
        const newItem = {
            id,
            name,
            price, 
            category,
            cantidad
        }
        if (cantidad >0){
            addToCart(newItem)
        }
    }

    return (

    <div className="contenedor">
        <h2>{name}</h2>
        <img className="imagen" src={img} alt={name}/>
        <p className="desc">{description}</p>
        <h4>Precio: ${price}</h4>

        { isInCart(id) 
            ? <Link to="/cart" className="btn btn-success">Terminar mi compra</Link>
            :
                <>
                    <ItemCount cantidad={cantidad} modify={setCantidad} max={stock}/>
                    <button className="btn btn-success my-3" onClick={handleAgregar}>Agregar</button>
                </>
        }

        <hr/>
        <button 
            className="btn btn-primary"
            onClick={() => goBack()}
        >
            Volver
        </button>

        <button 
            className="btn btn-outline-primary mx-4"
            onClick={() => push("/")}
        >
            Volver al inicio
        </button>
    </div>

    )
}
