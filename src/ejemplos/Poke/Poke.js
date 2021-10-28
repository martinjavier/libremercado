import { data } from 'jquery';
import React, { useEffect, useState } from 'react'
import { getPokemon } from './getPokemon';

export const Poke = () => {

    const size = 100;
    
    const [pokemon, setPokemon] = useState(null)
    const [busqueda, setBusqueda] = useState('')
    const [id, setId] = useState(1)

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }

    const handleSiguiente = () => {
        id < 1118 && setId (id+1)
    }

    const handleAnterior = () => {
        id > 1 && setId (id-1)
    }

    const handleSubmit = (e) => {

        // Para que no se recargue la página
        e.preventDefault()

        if(busqueda.length > 2)
        {
            getPokemon(busqueda)
            .then( res => {
                setPokemon(res)
                setId(res.id)
            })
            .catch( err => {
                setPokemon({
                    id: 0,
                    nombre: 'Pokemon no encontrado'
                })
            })
        }
    }

    useEffect( () => {
        setPokemon(null)

        getPokemon(id)
        .then( res => {
            setPokemon(res)
        })

    }, [id])

    return(
        <div className="container my-5">
            <h2>Pokemon</h2>
            <hr/>
            {
                !pokemon ? 
                <>
                    <h3 className="display-6">Cargando...</h3>
                    <img height={size} weight={size} src="https://c.tenor.com/0iK9a1WkT40AAAAC/loading-white.gif" alt=""/>
                </>
                : 
                <>
                    <h3 className="display-6">{pokemon.id} . {pokemon.nombre}</h3>
                    <img height={size} weight={size} src={pokemon.img} alt={pokemon.name}/>
                </>
            }

            <hr/>
            
            <button className="btn btn-primary" onClick={handleAnterior}>Anterior</button>
            <button className="btn btn-primary" onClick={handleSiguiente}>Siguiente</button>

            <hr/>

            <form onSubmit={handleSubmit}>
                <input 
                    className="form-control"
                    type="text"
                    value={busqueda}
                    onChange={handleInputChange}/>        
            </form>
        </div>
    )

}