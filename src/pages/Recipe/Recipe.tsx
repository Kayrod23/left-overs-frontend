import { useEffect } from "react";
import "./Recipe.css";
const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
import axios from "axios"

interface RecipeProps {
  recipe: string | null;
  recipeSteps: string | null;
  userId: number | null;
}

export default function Recipe({recipe, recipeSteps, userId}: RecipeProps) {
  console.log("page",recipe);
  console.log("page", recipeSteps);
  
  useEffect(() => {
    const recipeStepsP = document.getElementById("recipeSteps");
    if (recipeStepsP instanceof HTMLElement) {
      recipeStepsP.innerHTML = recipeSteps ?? '';
    }
  }, [recipeSteps])

  function saveResponse () {
    console.log('testing', recipe, recipeSteps);
    axios.post(`${VITE_BACKEND_API}/recipes`, {
      recipeName: recipe,
      recipeSteps: recipeSteps,
      userId: userId
    })
    .then(() => {
      console.log("sent to the backend!")
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="response">
    <h2 className="response__recipeName">{recipe}</h2>
    <p id="recipeSteps" className="response__recipeSteps"></p>
    <button className="response__save" onClick={saveResponse}>Save Recipe</button>
  </div>
  )
}
