import OpenAI from "openai";
import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading.js";
import generateRecipe from "../../components/helperFunctions/generateRecipe.tsx"
const IMGBB_API = import.meta.env.VITE_IMGBB_API;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
//defining the type of state as it has to be null and string
type StringState = string | null;
type NumberState = number | null;


function Home () {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<StringState>("");
  const [recipeSteps, setRecipeSteps] = useState<StringState>("");
  const [userId, setUserId] = useState<NumberState>(0);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { isAuthenticated, user } = useAuth0();

  function getUserIdFromEmail () {
    axios.get(`${VITE_BACKEND_API}/users/${user?.email}`)
    .then((response) => {
      setUserId(response.data.id);
    })
    .catch((error) => {
      console.log(error);
      axios.post(`${VITE_BACKEND_API}/users`, {
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      })
      getUserIdFromEmail();
    })
  }
  console.log("userId:", userId);

    useEffect(() => {
      if (isAuthenticated) {
        getUserIdFromEmail();
        setDisabled(false)
      } else {
        setDisabled(true);
      }
    }, [isAuthenticated])

  // takeImageInput takes an image file from your computer and send it to imgbb to be hosted so the image now has a url linked to it.
  // this allows it to be sent to chatgpt and analyzed to create a recipe.
  function takeImageInputAndSendToOpenAI(event: React.FormEvent): void {
    event.preventDefault();
    if (!isAuthenticated) {
      alert("You need to sign in to use this application.");
      return;
    }
    setLoading(true);
    console.log("Loading");
    const formElement = event.target as HTMLFormElement; 
    const form = new FormData(formElement);
    fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API}`, {
      method: 'POST',
      body: form,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        showChatGPTUserImage(data.data.url);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }

//run showChatGPTUserImage() when url is given from imgbb
  async function showChatGPTUserImage (imageUrl: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Generate a recipe, list recipe name only" },
            {
              type: "image_url",
              image_url: {
                "url": `${imageUrl}`,
              },
            },
          ],
        },
      ],
    });
    setRecipe(response.choices[0].message.content);
    getRecipeFromChatGPTImage(response.choices[0].message.content);
  }

// sends the recipe generated from chatGPT and send it back to then get a step by step guide on how to make the recipe.
  async function getRecipeFromChatGPTImage(recipe: string | null ) {
    const recipeSteps = await generateRecipe(recipe);
  //   for await (const chunk of recipeSteps) {
  //     setRecipeSteps(chunk.choices[0]?.delta?.content || "");
  // }
    setRecipeSteps(recipeSteps);
    setLoading(false);
  }

  async function getRecipeFromChatGPTSearch(event: React.FormEvent) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement; 
    const form = new FormData(formElement);
    const recipeName = form.get("recipeName") as string;
    setRecipe(recipeName);
    const recipeSteps = await generateRecipe(recipeName);
  //   for await (const chunk of recipeSteps) {
  //     setRecipeSteps(chunk.choices[0]?.delta?.content || "");
  // }
    setRecipeSteps(recipeSteps);
    setLoading(false);
  }

  // saves both recipe name and recipe steps into and sends it to the backend
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

  // console.log("state",recipe);
  // console.log("state", recipeSteps);
  return (
    <div className="home">
      {/* <NavBar/> */}
      <div className="home__container">
         <form className="home__fileform" onSubmit={takeImageInputAndSendToOpenAI}>
          <img className="home-fileform__img" src="/icons8.png"/>
          <input className="home-fileform__input" id="file" type="file" accept="image/*" name="image" disabled={disabled}/>
          <p className="home-fileform__text" >What do you have left over?</p>
          <button className="home-fileform__submit" type="submit">Submit</button>
        </form>
        { loading ? 
        <Loading/>
        :
        <div>
          { recipe && recipeSteps ? 
            <div className="response">
              <h2 className="response__recipeName">{recipe}</h2>
              <p className="response__recipeSteps">{recipeSteps}</p>
              <button className="response__save" onClick={saveResponse}>Save Recipe</button>
            </div>
            :
            <div className="search">
              <p className="search__title">Have a Recipe in mind?</p>
              <form className="search__form" onSubmit={getRecipeFromChatGPTSearch}>
                <input className="search-form__input" name="recipeName" type="text"/>
              </form>
            </div>
          }
        </div>
        }
      </div>
    </div>
  )
}

export default Home;