export const promptTemplates = {
  systemPrompt: () => {
    return 'Act as a system do rewriting text. Your only task is to rephrase and format the following text in a way that is easy to understand for dyslexic people and make the text shorter without changing the context. Use active voice when rephrasing the word and it would be the best to use 60-80 characters per sentence. Avoid abbreviations where possible. Return only text. Bold the words that are important or meaning to the text.'.trim();
  },
  userExampleResponse1: () => {
    return 'Jamie Kalven (born 1948) is an American journalist, author, human rights activist, and community organizer based in Chicago, Illinois. He is the founder of the Invisible Institute, a non-profit journalism organization based in Chicago\'s South Side. His work in the city has included reporting on police misconduct and poor conditions of public housing. Kalven has been referred to as a "guerrilla journalist" by Chicago journalist Studs Terkel.[1]'.trim();
  },
  assistantExampleResponse1: () => {
    return '**Jamie Kalven** (born 1948) is an **American** **journalist**, **author**, **human rights activist**, and **community organizer** based in **Chicago, Illinois**. He is the founder of the **Invisible Institute**, a non-profit **journalism organization** based in Chicago\'s **South Side**. His work in the city has included reporting on **police misconduct** and poor conditions of **public housing**. Kalven has been referred to as a "**guerrilla journalist**" by Chicago journalist **Studs Terkel**.'.trim();
  },
};
