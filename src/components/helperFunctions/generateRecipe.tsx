import OpenAI from "openai";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function generateRecipe(recipe: string | null) {
    const generatedRecipeSteps = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "you are a helpful assistant" },
      {"role" : "user", "content" : `can you give me a step by step guide for ${recipe}, and only list the steps, be as detailed as possible.`}],
      model: "gpt-3.5-turbo",
      // stream: true
      })
    return generatedRecipeSteps.choices[0].message.content;
}
