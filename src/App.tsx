// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
// import LandingPage from './pages/LandingPage/LandingPage.tsx';
import Home from "./pages/Home/Home.tsx";
import Recipes from "./pages/Recipes/Recipes.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import Recipe from "./pages/Recipe/Recipe.tsx";
import { useState } from "react";
// test
type StringState = string | null;
type NumberState = number | null;

function App() {
  const [recipe, setRecipe] = useState<StringState>(""
  //"test"
  );
  const [recipeSteps, setRecipeSteps] = useState<StringState>(""
    //"1. Heat a non-stick skillet over medium heat.<br/>2. Add chopped onions to the skillet and cook until they are soft and translucent.<br/>3. Push the onions to the side of the skillet and add chopped beef to the other side.<br/>4. Cook the beef until it is browned and cooked through, breaking it up with a spatula as it cooks.<br/>5. Season the beef and onions with salt, pepper, and your choice of seasoning (such as garlic powder or paprika).<br/>6. Place slices of cheese on top of the beef and onions and allow them to melt.<br/>7. Toast a Kaiser roll in a separate pan or toaster until it is lightly crispy.<br/>8. Scoop the beef, onions, and melted cheese onto the toasted roll.<br/>9. Top the chop cheese with condiments of your choice, such as ketchup, mustard, hot sauce, or mayonnaise.<br/>10. Serve hot and enjoy your delicious chop cheese sandwich."
  );
  const [userId, setUserId] = useState<NumberState>(0);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<LandingPage/>}/> */}
        <Route
          path="/"
          element={
            <Home
              recipe={recipe}
              setRecipe={setRecipe}
              recipeSteps={recipeSteps}
              setRecipeSteps={setRecipeSteps}
              userId={userId}
              setUserId={setUserId}
            />
          }
        />
        <Route
          path="/recipe"
          element={
            <Recipe 
              recipe={recipe} 
              recipeSteps={recipeSteps} 
              userId={userId} 
            />
          }
        />
        <Route path="/recipes" element={<Recipes/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
