import React, {useState, useContext} from 'react'
import { CartContext } from '../../context/CartContext'
import './Checkout.scss'
import Swal from 'sweetalert2'
import { getFirestore } from '../../firebase/config'
import firebase from 'firebase'
import 'firebase/firestore';

export const Checkout = () => {

    const {carrito, calcularTotal} = useContext(CartContext)

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        tel: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (values.nombre.length < 1) {
            Swal.fire({
                icon: 'error',
                type:'error',
                title:'Nombre Inválido'
            })
            return
        }

        if (values.apellido.length < 1) {
            Swal.fire({
                icon: 'error',
                type:'error',
                title:'Apellido Inválido'
            })
            return
        }

        if (values.email.length < 1) {
            Swal.fire({
                icon: 'error',
                type:'error',
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

        // Genero el objeto ORDER
        const orden = {
            buyer: {
                ...values
            },
            items: carrito,
            total: calcularTotal(),
            date: firebase.firestore.Timestamp.fromDate(new Date())
        }

        // Enviar esta orden a Firebase

        // Creo la conexión
        const db = getFirestore();
        // Referencio mi colección
        const orders = db.collection('orders');

        orders.add(orden)
            .then((res) => console.log(res.id))

    }

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>

        <div className="contenedor">
        <div className="container">
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
                <button className="btn btn-success" type="submit">Finalizar</button>
            </form>
        </div>
        </div>

        </>
    )
}
