import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { SavedRecipe } from "../components/SavedRecipe";
export const Show = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  if (!cookies) {
    navigate("/auth");
  }
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  // console.log(id)
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        // Fetch saved recipes array from the user's collection
        const id = window.localStorage.getItem("UserID");
        console.log(id);
        const response = await axios.get(
          "http://localhost:8080/auth/savedRecipes",
          { params: { id } }
        );

        const savedRecipeIds = response.data.savedRecipes;
        console.log(savedRecipeIds);

        // Fetch recipe details for each saved recipe ID
        const recipeRequests = savedRecipeIds.map(recipeId =>
          axios.get(`http://localhost:8080/recipe/${recipeId}`)
        );
        const recipeResponses = await Promise.all(recipeRequests);
        const fetchedRecipes = recipeResponses.map(response => response.data);

        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <SavedRecipe
          key={recipe.id}
          imageURL={recipe.imageURL}
          recipeName={recipe.name}
          recipeTime={recipe.time}
          userId={recipe.userId} // Assuming userId is included in recipe data
          onButtonClick={() => handleButtonClick(recipe.id)}
          onLoveClick={() => handleLoveClick(recipe.id)}
        />
      ))}
    </div>
  );
};
