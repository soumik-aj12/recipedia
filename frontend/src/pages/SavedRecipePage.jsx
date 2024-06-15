import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { SavedRecipe } from "../components/SavedRecipe";
export const SavedRecipePage = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  // console.log(id)
  const UserID = window.localStorage.getItem("UserID");
  useEffect(() => {
    if (cookies.access_token === "") {
      navigate("/auth");
    }
    const fetchSavedRecipes = async () => {
      try {
        // Fetch saved recipes array from the user's collection
        console.log(UserID);
        const response = await axios.get(
          "http://localhost:8080/auth/savedRecipes",
          { params: { UserID } }
        );

        const savedRecipeIds = response.data;
        console.log(savedRecipeIds);

        const recipeRequests = savedRecipeIds.map((recipeId) =>
          axios.get(`http://localhost:8080/recipe/${recipeId}`)
        );
        const recipeResponses = await Promise.all(recipeRequests);
        const fetchedRecipes = recipeResponses.map((response) => response.data);

        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  const unsaveClick = async (recipeID) => {
    const response = await axios.put("http://localhost:8080/recipe/unsave", {
      UserID,
      recipeID,
    });
    if (response) {
      // setRecipes((prevRecipes) => [...prevRecipes, response.data.savedRecipes]);
      setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== recipeID))
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  console.log(savedRecipes);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center p-6 gap-4">
      {recipes.map((recipe) => (
        <SavedRecipe
          key={recipe._id}
          imageURL={recipe.imageURL}
          recipeID={recipe._id}
          recipeName={recipe.name}
          recipeTime={recipe.time}
          userId={recipe.userId}
          onUnSaveClick={() => unsaveClick(recipe._id)}
          onButtonClick={() => handleButtonClick(recipe.id)}
        />
      ))}
    </div>
  );
};
