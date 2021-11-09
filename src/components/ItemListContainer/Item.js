import React from 'react'
import {Card, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import './Item.scss';

export const Item = ( {id, name, price, img, description, category} ) => {

    return (

        <Card style={{width: '18rem'}} className="m-3">
            <Card.Img className="imagenProducto" variant="top" src={img} />
            <Card.Body>
                <Card.Text className="nombre">{name}</Card.Text>
                <Card.Text className="desc">{description}</Card.Text>
                <Card.Text className="precio">Precio: ${price}</Card.Text>
                <Card.Text className="categoria">Categoria: {category}</Card.Text>

                <Link to={`/detail/${id}`}>
                    <Button variant="primary">Lo quiero</Button>
                </Link>
            </Card.Body>
        </Card>

    )
}