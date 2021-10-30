import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Loader } from '../Loader/Loader';
import { ItemDetail } from './ItemDetail';
import { UIContext } from '../../context/UIContext'
import { getFirestore } from '../../firebase/config'
import './ItemDetailContainer.scss';

export const ItemDetailContainer = () => {

    const [item, setItem] = useState(null)
    const {loading, setLoading} = useContext(UIContext)
    const {itemId} = useParams()

    useEffect(() => {

        setLoading(true)

        const db = getFirestore()
        const productos = db.collection("productos");
        const item = productos.doc(itemId)
        
        item.get()
            .then((doc) => {
                setItem({
                    id: doc.id,
                    ...doc.data()
                })
        })
        .finally(() => {
            setLoading(false)
        })

    }, [itemId, setLoading])

    return (
        <div className="container">
            <h2 className="mx-2">Su Producto</h2>
            <hr/>
            {
                loading ? <Loader/>
                : <ItemDetail {...item}/>
            }            
        </div>
    )
}
