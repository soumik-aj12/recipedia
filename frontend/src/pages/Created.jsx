import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RecipeModal } from "../components/RecipeModal";
import { CreatedComp } from "../components/CreatedComp";
import { EditRecipeModal } from "../components/EditRecipeModal";
import { Context } from "../Context/ContextProvider";
export const Created = () => {
  const [arrRecipes, setArrRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedEdit, setSelectedEdit] = useState(null);
  const [isEditOpen, setIsEditModalOpen] = useState(false);
  const { users, setUsers, recipes, setRecipes } = useContext(Context);
  const UserID = window.localStorage.getItem("UserID");

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleEditRecipe = async (recipe) => {
    setSelectedEdit(recipe);
    console.log(recipe)
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEdit(null);
  };

  return (
    <div className="grid grid-cols-1 justify-items-center p-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.
      filter((recipe)=>recipe.owner===UserID)
      .map((recipe) => (
        <CreatedComp
          key={recipe._id}
          recipeID={recipe._id}
          imageURL={recipe.imageURL}
          recipeName={recipe.name}
          recipeTime={recipe.time}
          onViewRecipe={() => handleViewRecipe(recipe)}
          onEditRecipe={() => handleEditRecipe(recipe)}
        />
      ))}
      <RecipeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recipe={selectedRecipe}
      />
      <EditRecipeModal
        isOpen={isEditOpen}
        onClose={handleCloseEditModal}
        recipe={selectedEdit}
        recipes={recipes}
        setRecipes={setRecipes}
      />
    </div>
  );
};
