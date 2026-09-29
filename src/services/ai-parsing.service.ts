import { generateText, Output } from "ai";
import { resumeDateSchema } from "../lib/schema/ai-output/resume-data.schema.js";

export async function parseResumeTextService(text: string) {
  const { output } = await generateText({
    model: "openai/gpt-5.2",
    instructions: `YOU ARE A RESUME PARSER AND MUST EXTRACT ALL THE RELEVANT INFORMATION FROM THE RESUME TEXT PROVIDED.

      ## GUIDELINES
      - EXTRACT ALL THE RELEVANT INFORMATION FROM THE RESUME TEXT PROVIDED.
      - YOU ARE LOOK OUT FOR FIELDS LIKE FIRSTNAME, LASTNAME, PHONE, EMAIL, LOCATION, PROFESSION, SKILLS, WORKEXPERIENCE, PROJECTS, EDUCATION.
      - YOU MUST NEVER RETURN ANYTHING OTHER INFORMATION THAT CAN BE FOUND IN THE RESUME TEXT.
      - LOCATIONS MUST BE EXTRACTED IN THE FORMAT "STATE, COUNTRY".
      - ONLY SOCIAL LINKS SHOULD GO INTO THE LINKS ARRAY (i.e linkedln, portfolio, Github, etc.) DO NOT INCLUDE LINKS TO PROJECTS
      `,
    output: Output.object({
      schema: resumeDateSchema,
    }),
    prompt: text,
  });

  return output;
}
