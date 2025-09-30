import React, { useState } from 'react'
import './RecipeSubmissionForm.css'

const RecipeSubmissionForm = () => {
    
    const [recipeList, setRecipeList] = useState([])
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        serving: '',
        difficulty: '',
        category: '',
        cuisineType: '',
        ingredients: [{
            name: '',
            quantity: '',
            unit: ''
        }],
        image: null
    })

    const handleRecipeChange = (e) => {
        const {name, value} = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe, [name]:value
        }))
    }

    const handleImageUpload = (e) => {
        setRecipe(prevRecipe => ({
            ...prevRecipe, image: URL.createObjectURL(e.target.files[0])
        }))
    }

    const addRecipe = (e) => {
        e.preventDefault()
        if (recipe){
            setRecipeList (prevRecipeList => [
                ...prevRecipeList,
                {
                    id: crypto.randomUUID(),
                    title: recipe.title,
                    description: recipe.description,
                    serving: recipe.serving,
                    difficulty: recipe.difficulty,
                    category: recipe.category,
                    cuisineType: recipe.cuisineType,
                    ingredients: recipe.ingredients,
                    image: recipe.image
                }
            ]);
            setRecipe({
                title: '',
                description: '',
                serving: '',
                difficulty: '',
                category: '',
                cuisineType: '',
                ingredients: [{
                    name: '',
                    quantity: '',
                    unit: ''
                }],
                image: null
            })
        }
    }

    const removeRecipe = (id) => {
        setRecipeList(prev =>
            prev.filter(recipe =>
                recipe.id !== id)
        )
    }


    const handleIngredientChange = (index, key, value) => {
        
        setRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.map((ingredient, i) =>
            i === index ? {...ingredient, [key]: value} : ingredient
        )
        }))
    }

    const addIngredient = () => {
        setRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, {name: '', quantity: '', unit: ''}]
        }))    

    }

    const removeIngredient = (index) => {
        setRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }))
    }



  return (
    <>
        <div>
            
            <form onSubmit={addRecipe}  id="recipeForm">
                <h1>Recipe Submission Form</h1>

                <input value={recipe.title} onChange={handleRecipeChange}  
                type="text" name="title" id="recipeTitle" placeholder="Recipe Title" maxLength="50" required/>

                <textarea value={recipe.description} onChange={handleRecipeChange}
                type="text" name="description" id="recipeDescription" placeholder="Description:" maxLength="500" required/>
                
                <input value={recipe.serving} onChange={handleRecipeChange}
                type="number" step="any" name="serving" id="recipeServings" placeholder="Servings:" min="0" max="100" required/>
                
                <div id='recipeDropdowns'>
                    <div id="recipeDifficulty" className='recipe-drop'>
                        <label htmlFor="difficulty">Difficulty:</label>
                        <select value={recipe.difficulty} onChange={handleRecipeChange}
                        name="difficulty" required>
                            <option value="">Select</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div id="recipeCategory" className='recipe-drop'>
                        <label htmlFor="category">Category:</label>
                        <select value={recipe.category} onChange={handleRecipeChange}
                        name="category" required>
                            <option value="">Select</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="mainCourse">Main Course</option>
                            <option value="dessert">Dessert</option>
                            <option value="sideDish">Side Dish</option>
                            <option value="beverage">Beverage</option>
                        </select>
                    </div>

                    <div id="recipeCuisineType" className='recipe-drop'>
                        <label htmlFor="cuisineType">Cuisine Type:</label>
                        <select value={recipe.cuisineType} onChange={handleRecipeChange}
                        name="cuisineType" required>
                            <option value="">Select</option>
                            <option value="american">American</option>
                            <option value="italian">Italian</option>
                            <option value="mexican">Mexican</option>
                            <option value="asian">Asian</option>
                            <option value="mediterranean">Mediterranean</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                </div>
                
                <input onChange={handleImageUpload} id='image' className='recipe-image-input'
                type="file" name='image' accept="image/*" alt="Recipe Image" width="50" height="50"></input>

                {recipe.image && 
                <img src={recipe.image} alt='Recipe Image' className='recipe-image' />
                }
                

                <div id='ingredientSection'>
                    <h3>Ingredients</h3>
                    
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className='ingredient-data'>

                            <input value={ingredient.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            type="text" className="ingredientName" name="name" placeholder="What do we need?" required/>

                            <input value={ingredient.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            type="number" className="ingredientQuantity" name= "quantity" placeholder="Quantity"  required/>

                            {/* <label htmlFor="ingredientUnit">Measurement Unit:</label> */}
                            <select value={ingredient.unit} onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            name="unit" className="ingredientUnit" required>
                                <option value="">Select Unit</option>
                                <option value="cups">Cups</option>
                                <option value="tablespoons">Tablespoons</option>
                                <option value="teaspoons">Teaspoons</option>
                                <option value="ounces">Ounces</option>
                                <option value="pounds">Pounds</option>
                                <option value="grams">Grams</option>
                                <option value="pieces">Pieces</option>
                            </select>

                            <button onClick={() => removeIngredient(index)}
                                className='remove-btn'>Remove</button>

                        </div>
                    ))}

                        <button onClick={addIngredient} id="addIngredientBtn" className="button">Add Ingredient</button>
                   
                </div>


                <button type="submit" id="addRecipeBtn" className="button">Submit Recipe</button>
            </form>

            <div id='recipeList'>
                    {recipeList.map(recipe=> (
                        <div className='recipe-card' id={recipe.id} key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <p>{recipe.serving}</p>
                            <p>{recipe.difficulty}</p>
                            <p>{recipe.category}</p>
                            <p>{recipe.cuisineType}</p>
                            {/* <div>{recipe.ingredients}</div> */}
                            <button onClick={() => removeRecipe(recipe.id)}
                                className='remove-btn'>Remove</button>
                        </div>
                    ))}
            </div>

        </div>
    </>
  )
}

export default RecipeSubmissionForm