import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.post("http://localhost:5000/recipe", recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
            .then(() => navigate("/"))
    }
    return (
        <>
            <div className='add-recipe-page fade-in'>
                <div className='add-recipe-container'>
                    <form className='form' onSubmit={onHandleSubmit}>
                        <div className='form-header'></div>
                        <h2>Add New Recipe</h2>
                        <div className='form-control'>
                            <label>Recipe Title</label>
                            <input type="text" className='input' name="title" onChange={onHandleChange} required></input>
                        </div>
                        <div className='form-control'>
                            <label>Prep Time</label>
                            <input type="text" className='input' name="time" placeholder="e.g. 30 mins" onChange={onHandleChange} required></input>
                        </div>
                        <div className='form-control'>
                            <label>Ingredients (comma separated)</label>
                            <textarea className='input-textarea' name="ingredients" rows="4" placeholder="e.g. flour, sugar, eggs" onChange={onHandleChange} required></textarea>
                        </div>
                        <div className='form-control'>
                            <label>Instructions</label>
                            <textarea className='input-textarea' name="instructions" rows="6" placeholder="Step 1&#10;Step 2..." onChange={onHandleChange} required></textarea>
                        </div>
                        <div className='form-control'>
                            <label>Recipe Image</label>
                            <input type="file" className='input' name="file" accept="image/*" onChange={onHandleChange} required></input>
                        </div>
                        <div className='form-actions'>
                            <button type="submit" className='submit-btn'>Create Recipe</button>
                            <button type="button" onClick={() => navigate(-1)} className='cancel-btn'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
