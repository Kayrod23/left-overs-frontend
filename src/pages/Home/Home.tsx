import OpenAI from "openai";
import { useState } from "react";
import "./Home.css";
import Loading from "../../components/Loading.js";
const IMGBB_API = import.meta.env.VITE_IMGBB_API;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
//defining the type of state as it has to be null and string
type StringState = string | null;

function Home () {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<StringState>("The Cat Rat");
  const [recipeSteps, setRecipeSteps] = useState<StringState>("first get the cat to beat the rat then get the cat to find the rats hat to pay respect to the rat. after all that we can start cooking the rat. add salt and pepper nothing else, cook on low heat for 1 min and check to make sure it is blue rare. use the tail as a hair band but not for too long as this can cause some form of self harm");

  // takeImageInput takes an image file from your computer and send it to imgbb to be hosted so the image now has a url linked to it.
  // this allows it to be sent to chatgpt and analyzed to create a recipe.
  function takeImageInputAndSendToOpenAI(event: React.FormEvent): void {
    event.preventDefault();
    setLoading(true);
    console.log("running");
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
        // getRecipeFromChatGPT("fresh tomato salsa");
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
        getRecipeFromChatGPT(response.choices[0].message.content);
        // send this to the back end along with the steps when completed
      }

// sends the recipe generated from chatGPT and send it back to then get a step by step guide on how to make the recipe.
      async function getRecipeFromChatGPT(recipe: string | null) {
        const recipeSteps = await openai.chat.completions.create({
          messages: [{"role": "system", "content": "you are a helpful assistant" },
        {"role" : "user", "content" : `can you give me a step by step guide for ${recipe}, and only list the steps`}],
        model: "gpt-3.5-turbo",
        // stream: true
        })
      //   for await (const chunk of recipeSteps) {
      //     setRecipeSteps(chunk.choices[0]?.delta?.content || "");
      // }
        setRecipeSteps(recipeSteps.choices[0].message.content);
        setLoading(false);
      }

  console.log("state",recipe);
  console.log("state", recipeSteps);
  return (
    <div className="home">
      {/* <NavBar/> */}
      <div className="home__container">
         <form className="home__fileform" onSubmit={takeImageInputAndSendToOpenAI}>
          {/* <label htmlFor='file'>Image</label> */}
          <img className="home-fileform__img" src="/icons8.png"/>
          <input className="home-fileform__input" id="file" type="file" accept="image/*" name="image"/>
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
            </div>
            :
            null
          }
        </div>
        }
      </div>
    </div>
  )
}

export default Home