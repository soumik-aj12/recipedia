import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Recipe as RecipeCard } from "../components/Recipe";
import { RecipeModal } from "../components/RecipeModal";
import { Context } from "../Context/ContextProvider";
export const Home = () => {
  
  const {recipes, setRecipes, users, setUsers} = useContext(Context);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const UserID = window.localStorage.getItem("UserID");
  useEffect(() => {
    if(UserID!==null){
      const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/auth/savedRecipes",
            { params: { UserID } }
          );
          // console.log(response.data);
          setSavedRecipes(response.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchSavedRecipes();
    }
  }, [UserID]);
  const saveRecipe = async(recipeID)=>{
    const response = await axios.put("http://localhost:8080/recipe/save",{UserID,recipeID});
    // console.log(response.data)
    if(response){
      setSavedRecipes(prevSavedRecipes => [...prevSavedRecipes, recipeID]);
    }
  }

  const unsaveClick = async(recipeID) => {
    const response = await axios.put("http://localhost:8080/recipe/unsave",{UserID,recipeID});
    if(response){
    setSavedRecipes(prev => prev.filter(id => id !== recipeID));
    }
    // console.log(savedRecipes)
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };
  // console.log(selectedRecipe)
  return (
    <div className="grid grid-cols-1 justify-items-center p-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipeID={recipe._id}
          users={users}
          imageURL={recipe.imageURL}
          recipeName={recipe.name}
          recipeTime={recipe.time}
          owner={recipe.owner}
          onSaveClick={() => savedRecipes.includes(recipe._id) ? unsaveClick(recipe._id) : saveRecipe(recipe._id)}
          onViewRecipe={() => handleViewRecipe(recipe)}
          isRecipeSaved={isRecipeSaved}
        />
      ))}
        <RecipeModal isOpen={isModalOpen} onClose={handleCloseModal} recipe={selectedRecipe} />
    </div>
  );
};
