import axios from "axios";
import React, { useEffect, useState } from "react";

export const EditRecipeModal = ({ isOpen, onClose, recipe, recipes, setRecipes }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [time, setTime] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setImage(recipe.imageURL);
      setInstructions(recipe.instructions);
      setTime(recipe.time);
      setIngredients(recipe.ingredients || []);
    }
  }, [recipe]);
  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    console.log(updatedIngredients);
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.put(`http://localhost:8080/recipe/${recipe._id}`,{name,image,time,ingredients,instructions});
      setRecipes(res.data);
    }finally{
      setIngredientInput("");
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                      Edit a recipe:-
                    </h3>
                    <div className="max-w-lg mx-auto">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 font-bold mb-2"
                        >
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
                        <label
                          htmlFor="time"
                          className="block text-gray-700 font-bold mb-2"
                        >
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
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
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
                          {recipe &&
                            ingredients.map((ingredient, index) => (
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
                        <label
                          htmlFor="instructions"
                          className="block text-gray-700 font-bold mb-2"
                        >
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
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={handleSubmit} 
                        >
                          Update
                        </button>
                        <button
                          onClick={onClose}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
