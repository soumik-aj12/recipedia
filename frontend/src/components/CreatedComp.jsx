import React, { useEffect, useState } from "react";
export const CreatedComp = ({
  imageURL,
  recipeName,
  recipeTime,
  onViewRecipe,
  onEditRecipe
}) => {
 return (
    <div
      className="max-w-xs rounded overflow-hidden shadow-lg"
      key={recipeName}
    >
      <img
        className="w-[500px] h-[200px]"
        src={imageURL}
        alt={recipeName}
        height="100"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {recipeName}{" "}
        </div>
        <p className="text-gray-700 text-base">Time: {recipeTime}</p>
        <div className="mt-4">
          <button
            type="button"
            onClick={onViewRecipe}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
          >
            View Recipe
          </button>
          <button
            type="button"
            onClick={onEditRecipe}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
          >
            Edit Recipe
          </button>
        </div>
      </div>
    </div>
  );
};
