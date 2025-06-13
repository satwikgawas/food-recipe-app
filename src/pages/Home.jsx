import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row } from "react-bootstrap"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
    const [recipes, setRecipes] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState()
    const [error, setError] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem("recipes")
        if (stored)
            setRecipes(JSON.parse(stored))
    }, [])

    const addRecipe = (e) => {
        e.preventDefault();
        if (!title || !description || !image) {
            setError('All fields are required.');
            return;
        }
        setError('');
        const newRecipe = {
            id: Date.now(),
            title,
            description,
            image
        }
        const updatedRecipes = [...recipes, newRecipe]
        setRecipes(updatedRecipes)
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes))
        setTitle("")
        setDescription("")
        setImage("")
    }

    const deleteRecipe = (id) => {
        const updated = recipes.filter(r => r.id !== id)
        setRecipes(updated)
        localStorage.setItem("recipes", JSON.stringify(updated))
    }

    return (
        <>
            <Container className='p-4'>
                <h2 className='mb-4'>Food Recipe App</h2>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Recipe Title</Form.Label>
                        <Form.Control value={title} isInvalid={!title && error} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Recipe Description</Form.Label>
                        <Form.Control value={description} isInvalid={!description && error} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control value={image} isInvalid={!image && error} onChange={(e) => setImage(e.target.value)} />
                    </Form.Group>
                    <Button onClick={addRecipe}>Add Recipe</Button>
                </Form>
                <Row className='mt-4'>
                    {recipes.map(r => (
                        <RecipeCard key={r.id} recipe={r} onDelete={deleteRecipe} />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Home
