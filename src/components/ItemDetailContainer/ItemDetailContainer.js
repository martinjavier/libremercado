import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { pedirProductos } from '../../helpers/pedirProductos';
import { Loader } from '../Loader/Loader';
import { ItemDetail } from './ItemDetail';
import './ItemDetailContainer.scss';

export const ItemDetailContainer = () => {

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(false)

    const {itemId} = useParams()

    useEffect(() => {

        setLoading(true)

        pedirProductos()
            .then ( res => {
                setItem( res.find( prod => prod.id === Number(itemId)))
            })
            .finally ( () => {
                setLoading(false)
            })
    }, [itemId])

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
