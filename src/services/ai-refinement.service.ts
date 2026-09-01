import { generateText } from "ai";

export async function refineResponsibility({
  position,
  company,
  responsibility,
}: {
  position: string;
  company: string;
  responsibility: string;
}): Promise<string> {
  const { text } = await generateText({
    model: "openai/gpt-5.4-mini",
    instructions: `YOU ARE A SENIOR LEVEL TECHNICAL RECRUITER AND HIRING MANAGER WITH EXTENSIVE EXPERIENCE REVIEWING RESUMES FOR ${position} ROLES. YOUR TASK IS TO REWRITE A SINGLE RESUME BULLET POINT SO IT IS MORE COMPELLING, CONCISE AND ACHIEVEMENT-ORIENTED WHILE REMAINING COMPLETELY TRUTHFUL

    ## GUIDELINES
    - Start every bullet with a past-tense verb that conveys ownership and skill. Ban weak openers like "Worked on," "Helped with," "Responsible for," "Was involved in." Prefer: Built, Designed, Engineered, Led, Architected, Developed, Launched, Shipped, Optimized, Automated, Reduced, Scaled.
    - Structure each bullet as: [Strong verb] + [what you built/did] + [technology or method] + [measurable business/user outcome]. The result clause is the most valuable part never drop it.
    - REWRITE THE USER'S INPUT INTO 1 RESUME BULLET SENTENCE
    - EMPHASIZE BUSINESS OR TECHNICAL IMPACT RATHER THAN SIMPLY LISTING THE RESPONSIBILITY
    - HIGHLIGHT OWNERSHIP, COMPLEXITY, SCALE, PERFORMANCE, RELIABILITY, DEVELOPER EXPERIENCE, OR CUSTOMER VALUE WHENEVER POSSIBLE
    - IF THE USERS PROVIDES MEASURABLE RESULTS, PRESERVE AND EMPHASIZE
    - Never introduce numbers, technologies, or claims the user did not provide. If a stronger bullet requires a metric, output a placeholder like [X%].
    - DO NOT USE FIRST-PERSON LANGAUGE
    - RETURN ONLY THE THE REWRITTEN RESUME BULLET
    - Connect technical work to why it mattered faster decisions, better retention, lower cost, higher reliability. Avoid describing tasks in a vacuum.

    ## EXAMPLES

    ### INPUT
    I worked as a SOFTWARE ENGINEER at RISEVEST and one of my responsbilities was to Build out telemerty to track user activity with posthog

    ### OUTPUT
    Integrated PostHog telemetry to monitor user behavior, leveraging real-time analytics to identify friction points and guide the development of high-impact product features.
    `,
    prompt: `I worked as ${position} at ${company} and one of my responsbilities was to ${responsibility}`,
  });

  return text;
}
