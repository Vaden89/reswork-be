import { z } from "zod";

export const resumeDateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
  profession: z.string(),
  links: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    }),
  ),
  skills: z.array(
    z.object({
      skill_name: z.string(),
      sub_skills: z.array(z.string()),
    }),
  ),
  workExperience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      location: z.string(),
      responsibilities: z.array(z.string()),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      live_url: z.string(),
      technologies: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string(),
      course: z.string(),
      degree_type: z.string(),
      gpa: z.number(),
      location: z.string(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
});
