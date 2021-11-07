import { getFirestore } from './config'
import firebase from 'firebase'
import 'firebase/firestore';

export const generarOrden = (datos, carrito, total) => {

    return new Promise(async (resolve, reject) => {

        // Genero el objeto ORDER
        const orden = {
            buyer: datos,
            items: carrito.map((el) => ({id: el.id, precio: el.price, cantidad: el.cantidad})),
            total: total,
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

            // Agrego la orden a la colección
            orders.add(orden)
                .then((res) => {                    
                    batch.commit()
                    resolve(res.id)
                }).catch(err => {
                    reject(err)
                })
        } else {
            reject(outOfStock)
        }
    }) 
}