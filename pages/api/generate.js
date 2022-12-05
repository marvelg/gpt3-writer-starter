import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Evaluate the essay below as if you were a college admissions officer.
Provide me with concerete feedback on how to improve it. Please give specific feedback based on the phrases and situation in the essay.
Be very specific and mention relevant examples in the essay. Give examples of how you would improve the essay.

Provide at least a 250 word evaluation.
`; 
// Mention what parts can be cut out from the essay.
//Introduce prompt chaining and one-shot learning with examples.
const generateAction = async (req, res) => {
  // Run first prompt

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}
            Essay: ${req.body.userInput}
            Admissions Officer:`,
    temperature: 0.9,
    max_tokens: 300,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;