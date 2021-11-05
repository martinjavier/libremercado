import React, {useState, useContext} from 'react'
import { Redirect } from 'react-router'
import { CartContext } from '../../context/CartContext'
import './Checkout.scss'
import Swal from 'sweetalert2'
import { getFirestore } from '../../firebase/config'
import firebase from 'firebase'
import 'firebase/firestore';
import { Loader } from '../Loader/Loader'
import { UIContext } from '../../context/UIContext'

export const Checkout = () => {

    const {loading, setLoading} = useContext(UIContext)

    const {carrito, calcularTotal, vaciarCarrito} = useContext(CartContext)

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
            items: carrito.map((el) => ({id: el.id, precio: el.price, cantidad: el.cantidad})),
            total: calcularTotal(),
            date: firebase.firestore.Timestamp.fromDate(new Date())
        }

        // Enviar esta orden a Firebase

        // Creo la conexión
        const db = getFirestore();
        // Referencio mi colección orders o la creo si no existe
        const orders = db.collection('orders');
        // Configuro setLoading
        setLoading(true)
        // Agrego la orden a la colección
        orders.add(orden)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    type:'success',
                    title:'Su compra ha sido registrada',
                    html: 'Operación <strong>'+res.id+'</strong> realizada'
                  })
                vaciarCarrito()
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    type:'error',
                    title:'Error Inesperado',
                    text: `${err}`
                  })
            }).finally(() => {
                setLoading(false)
            })   
            
            carrito.forEach((item) => {
                const docRef = db.collection('productos').doc(item.id)
                docRef.get()
                    .then((doc) => {
                        docRef.update({
                            stock: doc.data().stock - item.cantidad
                        })
                })
            })

    }

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
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
