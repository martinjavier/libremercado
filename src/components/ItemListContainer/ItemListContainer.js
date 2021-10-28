import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { UIContext } from '../../context/UIContext'
import { pedirProductos } from '../../helpers/pedirProductos'
import { Loader } from '../../components/Loader/Loader';
import { ItemList } from './ItemList'
import './ItemListContainer.css'

export const ItemListContainer = () => {

    const [items, setItems] = useState([])
    
    const {loading, setLoading} = useContext(UIContext)
 
    const {categoryId} = useParams()

    useEffect(()=>{
        setLoading(true)

        pedirProductos()
            .then((res) => {

                if (categoryId) {
                    setItems( res.filter( prod => prod.category === categoryId) )
                } else {
                    setItems( res )
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })

    }, [categoryId, setLoading])

    return (
        <section className="container my-5">
            {
                loading 
                    ? <Loader/>
                    : <ItemList productos={items}/>
            }
            
        </section>
    )
}