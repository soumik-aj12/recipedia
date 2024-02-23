import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Recipe as RecipeCard} from '../components/Recipe';

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [users,setUsers] = useState([]);
  const [saveRecipe,setSaveRecipe] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/recipe");
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
    const fetchUsers = async ()=>{
      try{
        const response = await axios.get("http://localhost:8080/auth/users");
        setUsers(response.data);
        console.log(response.data)
        setSaveRecipe(response.data);
        // console.log(response.data)
      }catch(e){console.log(e);}
    };
    fetchUsers();

  }, []);
  const handleSaveClick = (recipeID)=>{
    setSaveRecipe(prev=>[...[prev,recipeID]])
  };
  const handleUnSaveClick = (recipeID)=>{
    setSaveRecipe(prev=>prev.filter(id=>id!=recipeID));
  }
  return (
    <div className="grid grid-cols-1 justify-items-center p-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe._id}
          recipeID={recipe._id}
          users={users}
          imageURL={recipe.imageURL}
          recipeName={recipe.name}
          recipeTime={recipe.time}
          owner={recipe.owner}
          onButtonClick={() => handleButtonClick(recipe.id)} // handleButtonClick function should be defined to view recipe details
          onSaveClick={() => saveRecipe.includes(recipe._id)?handleUnSaveClick(recipe._id):handleSaveClick(recipe._id)} // handleLoveClick function should be defined to add recipe to favorites
          isSaved={saveRecipe.includes(recipe._id)}
        />
      ))}
    </div>
  );
}


