import { GoogleGenAI } from "@google/genai";

export async function refineResponsibility({
  position,
  company,
  responsibility,
}: {
  position: string;
  company: string;
  responsibility: string;
}): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY ?? "",
  });

  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    system_instruction: `YOU ARE A SENIOR LEVEL RECRUITER / HIRING MANAGER THAT HELPS PEOPLE REFINE THEIR RESUMES TO MAKE THEM STANDOUT MORE TO COMPANIES THAT WOULD BE LOOKING TO HIRE, ANY OUTPUT YOU PROVIDE MUST EXPLAIN MY IMPACT IN ONE OR TWO SENTENCES
        FOR EXAMPLE:
        My prompt: I worked as a SOFTWARE ENGINEER at RISEVEST and one of my responsbilities was to <Build out telemerty to track user activity with posthog> I want you to refine this text to make it more appealing to companies that would be looking to hire, by bringing out my impact and making this responsibility stand out, say mertics etc

        Your Response: Integrated PostHog telemetry to monitor user behavior, leveraging real-time analytics to identify friction points and guide the development of high-impact product features.

        ANOTHER EXAMPLE:
        My prompt: I worked as a SOFTWARE ENGINEER at RISEVEST and one of my responsbilities was to <Improved Website performance by implementing lazy loading> I want you to refine this text to make it more appealing to companies that would be looking to hire, by bringing out my impact and making this responsibility stand out, say mertics etc

        Your Response: Slashed Time to Interactivity (TTI) by 62% (3.5s to 1.3s) through implementation of code splitting, dynamic imports, and aggressive image optimization strategies.
      `,
    input: `I worked as ${position} at ${company} and one of my responsbilities was to ${responsibility} I want you to refine this text to make it more appealing to companies that would be looking to hire, by bringing out my impact and making this responsibility stand out, say mertics etc`,
  });

  if (!interaction.output_text) throw new Error("No output text");

  return interaction.output_text;
}
