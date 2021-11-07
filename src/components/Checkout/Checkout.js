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

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
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

        // Genero el objeto ORDER
        const orden = {
            buyer: {
                ...values
            },
            items: carrito.map((el) => ({id: el.id, precio: el.price, cantidad: el.cantidad})),
            total: calcularTotal(),
            date: firebase.firestore.Timestamp.fromDate(new Date())
        }

        // Firebase, Armo un Batch de actualización

        // Creo la conexión
        const db = getFirestore();

        // Referencio mi colección orders o la creo si no existe
        const orders = db.collection('orders');

        const itemsToUpdate = db.collection('productos')
            .where(firebase.firestore.FieldPath.documentId(), 'in', carrito.map(el => el.id))
        
        const query = await itemsToUpdate.get()
        const batch = db.batch()
        const outOfStock = []

        query.docs.forEach((doc) => {
            const itemInCart = carrito.find(prod => prod.id === doc.id)

            if (doc.data().stock >= itemInCart.cantidad)
            {
                batch.update(doc.ref, {stock: doc.data().stock - itemInCart.cantidad})
            } else {
                outOfStock.push({...doc.data(), id: doc.id})
            }
        })

        if (outOfStock.length === 0){

            // Configuro setLoading
            setLoading(true)

            // Agrego la orden a la colección
            orders.add(orden)
                .then((res) => {
                    
                    batch.commit()

                    Swal.fire({
                        icon: 'success',
                        title:'Su compra ha sido registrada',
                        html: 'Operación <strong>'+res.id+'</strong> realizada'
                    })
                    vaciarCarrito()
                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title:'Error Inesperado',
                        text: `${err}`
                    })
                }).finally(() => {
                    setLoading(false)
                })  
        } else {
            Swal.fire({
                icon: 'error',
                title: "Falta de Productos",
                text: outOfStock.map(el => el.name).join(', ')
              })
        }
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
