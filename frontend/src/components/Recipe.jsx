import React, { useEffect, useState } from "react";
export const Recipe = ({
  recipeID,
  imageURL,
  users,
  recipeName,
  recipeTime,
  onButtonClick,
  isSaved,
  onSaveClick,
  owner,
}) => {
  const user = users.find((user) => user._id === owner);
  return (
    <div
      className="max-w-xs rounded overflow-hidden shadow-lg"
      key={recipeName}
    >
      <img
        className="w-full h-[200px]"
        src={imageURL}
        alt={recipeName}
        height="100"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {recipeName}{" "}
          <span className="text-xs"> - {user ? user.name : "Loading..."}</span>
        </div>
        <p className="text-gray-700 text-base">Time: {recipeTime}</p>
        <div className="mt-4">
          <button
            onClick={onButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
          >
            View Recipe
          </button>
          <button
            onClick={() => onSaveClick(recipeID)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSaved ? <span>❤️ Saved</span> : <span>❤️ Save</span>}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
