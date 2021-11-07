import React, {useState, useContext} from 'react'
import { Redirect } from 'react-router'
import { CartContext } from '../../context/CartContext'
import './Checkout.scss'
import Swal from 'sweetalert2'
import { Loader } from '../Loader/Loader'
import { UIContext } from '../../context/UIContext'
import { generarOrden } from '../../firebase/generarOrden'
import 'firebase/firestore';

export const Checkout = () => {

    const {loading, setLoading} = useContext(UIContext)

    const {carrito, calcularTotal, vaciarCarrito} = useContext(CartContext)

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        tel: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (values.nombre.length < 1) {
            Swal.fire({
                icon: 'error',
                title:'Nombre Inválido'
            })
            return
        }

        if (values.apellido.length < 1) {
            Swal.fire({
                icon: 'error',
                title:'Apellido Inválido'
            })
            return
        }

        if (values.email.length < 1) {
            Swal.fire({
                icon: 'error',
                title:'EMail Inválido'
            })
            return
        }

        if (values.tel.length < 6) {
            Swal.fire({
                icon: 'error',
                type:'error',
                title:'Teléfono Inválido'
            })
            return
        }

        setLoading(true)
 
        generarOrden(values, carrito, calcularTotal())
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title:'Su compra ha sido registrada',
                    html: 'Operación realizada',
                    willClose: () => {
                        vaciarCarrito()
                    }
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title:'Producto Sin Stock',
                    text: `No hay stock de ${err.map(el => el.name).join(', ')}`
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
        {carrito.length === 0 && <Redirect to="/" />}

        {loading && <Loader/>}

        <div className="container angosto">
            <hr/>
            <h2>Complete Sus Datos</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
                <h2>Formulario</h2>
                <input 
                    className="form-control my-2"
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleInputChange}
                />                
                <input
                    className="form-control my-2"
                    type="text"
                    placeholder="Apellido"
                    name="apellido"
                    value={values.apellido}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control my-2"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control my-2"
                    type="tel"
                    placeholder="Teléfono"
                    name="tel"
                    value={values.tel}
                    onChange={handleInputChange}
                />
                <button className="btn btn-success" type="submit" disabled={loading}>Finalizar</button>
            </form>
        </div>
        </>
    )
}
