import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const ContextProvider = ({children})=>{
    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);
    const UserID = window.localStorage.getItem("UserID");
    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const response = await axios.get("http://localhost:8080/recipe");
            setRecipes(response.data);
          } catch (error) {
            console.error("Error fetching recipes:", error);
          }
        };
        fetchRecipes();
        const fetchUsers = async () => {
          try {
            const response = await axios.get("http://localhost:8080/auth/users");
            setUsers(response.data);
            // console.log(response.data);
          } catch (e) {
            console.log(e);
          }
        };
    
        fetchUsers();
      }, [UserID]);
        return (
        <Context.Provider value={{users,setUsers,recipes,setRecipes}}>
            {children}
        </Context.Provider>
    )
}