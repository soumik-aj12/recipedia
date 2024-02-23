import axios from "axios";
import React, { useState } from "react";

export const Create = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [instructions,setInstructions] = useState("");
  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };
  const owner = window.localStorage.getItem("UserID");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8080/recipe",{name,ingredients,instructions,imageURL,time,owner});
      console.log(imageURL);
      alert("Recipe added");
    }catch(e){console.log(e);}
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold p-6 text-center text-red-500">Add Recipes</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Recipe Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter recipe name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
          Cooking Time
        </label>
        <input
          type="text"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter cooking time"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="imageURL"
          className="block text-gray-700 font-bold mb-2"
        >
          Image URL
        </label>
        <input
          type="text"
          id="imageURL"
          value={imageURL}
          onChange={(e) => setImageUrl(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter image URL"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="ingredients"
          className="block text-gray-700 font-bold mb-2"
        >
          Ingredients
        </label>

        <div className="flex mt-2">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Add ingredient"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 m-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={ingredient}
                readOnly
                className="bg-gray-200 rounded-full py-1 px-3 text-sm font-semibold focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="ml-2 text-red-500 focus:outline-none"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="instructions" className="block text-gray-700 font-bold mb-2">
          Instructions
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter recipe name"
          required
        />
      </div>
      {/* Submit button */}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Recipe
        </button>
      </div>
    </form>
    </div>
  );
};
