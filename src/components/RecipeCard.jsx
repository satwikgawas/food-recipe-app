import React from 'react'
import { Card, Button } from "react-bootstrap"

const RecipeCard = ({ recipe, onDelete }) => {
    return (
        <>
            <Card style={{ width: "18rem" }} className='m-2'>
                <Card.Img variant="top" src={recipe.image} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>{recipe.description}</Card.Text>
                    <Button variant="danger" onClick={() => onDelete(recipe.id)}>Delete</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default RecipeCard
