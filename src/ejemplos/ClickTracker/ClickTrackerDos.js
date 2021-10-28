import React, { useState, useEffect } from 'react'

export const ClickTrackerDos = () => {

    const [coord, setCoord] = useState({x:0,y:0})

    const handleClick = (e) => {
        //console.log(e)
        setCoord({
            x: e.x,
            y: e.y
        })
    }

    useEffect( () => {

        // Montaje y posibles actualizaciones
        window.addEventListener('click', handleClick)   

        // Desmontaje
        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div 
            // Evento de React
            onClick={(e) => console.log(e.nativeEvent)}
            className="cotainer"
        >            
            <hr/>
            <h3>X: {coord.x}</h3>
            <h3>Y: {coord.y}</h3>
        </div>
    )

}