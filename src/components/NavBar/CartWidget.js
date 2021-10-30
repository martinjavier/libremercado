import { blue } from 'color-name';
import React, { useContext } from 'react'
import {FaShoppingCart} from 'react-icons/fa';
import { CartContext } from '../../context/CartContext'
import './CartWidget.css';

export const CartWidget = () => {

  const { calcularCantidad } = useContext(CartContext)

    return (
          <div style={{
            display: calcularCantidad() === 0 ? "none" : "block"
          }}>
            <FaShoppingCart className="widget"/>
            <span>{calcularCantidad()}</span>
          </div>             
    )
}
