
import { GoogleGenAI, Type, Part } from "@google/genai";
import type { UserKnowledgeBase, TailoredResume, PdfDataPart } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    personalInfo: {
      type: Type.OBJECT,
      properties: {
        fullName: { type: Type.STRING },
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        linkedin: { type: Type.STRING },
        location: { type: Type.STRING },
      },
      required: ['fullName', 'email', 'phone', 'location'],
    },
    summary: { 
      type: Type.STRING,
      description: "A professional summary of 3-5 sentences, tailored specifically to the job description, highlighting the most relevant skills and experience from all user's provided sources (JSON and PDFs). The output language MUST BE Hebrew."
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          company: { type: Type.STRING },
          period: { type: Type.STRING },
          description: {
            type: Type.ARRAY,
            items: { 
              type: Type.STRING,
              description: "A bullet point describing a responsibility or achievement, rewritten to match keywords and requirements from the job description. The output language MUST BE Hebrew."
            },
          },
        },
        required: ['role', 'company', 'period', 'description'],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING },
          institution: { type: Type.STRING },
          period: { type: Type.STRING },
        },
        required: ['degree', 'institution', 'period'],
      },
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['category', 'items'],
      },
    },
  },
  required: ['personalInfo', 'summary', 'experience', 'education', 'skills'],
};

export const generateTailoredResume = async (
  knowledgeBase: UserKnowledgeBase | null,
  pdfs: PdfDataPart[],
  jobDescription: string
): Promise<TailoredResume> => {
  const instructionPrompt = `
    You are an expert career coach and resume writer for the tech industry.
    Your task is to create a tailored, concise, one-page resume. You will receive a user's professional information from multiple sources: a structured JSON object and potentially one or more PDF files (which are previous CVs). Your goal is to synthesize information from ALL provided sources to create the best possible resume for the given job description.

    1.  **Analyze Job:** Deeply analyze the target job description to identify key requirements, skills, and keywords.
    2.  **Synthesize Sources:**
        - If a JSON knowledge base is provided, treat it as the primary, structured source of truth.
        - Analyze the content of all provided PDF files. Extract relevant achievements, project details, or specific phrasing that might be missing from the JSON or could enhance the descriptions.
    3.  **Select & Tailor:** From ALL available information (JSON and PDFs), select ONLY the most relevant experiences, projects, and skills that directly match the job description. Omit irrelevant information.
    4.  **Rewrite & Refine:** Rewrite the professional summary and experience descriptions to align perfectly with the job's requirements, using its language and keywords. Merge and refine details from all sources for maximum impact.
    5.  **Format:** Ensure the final output is a valid JSON object that strictly follows the provided schema.
    
    THE ENTIRE OUTPUT, INCLUDING ALL TEXT FIELDS, MUST BE IN HEBREW.
  `;

  const contentParts: Part[] = [{ text: instructionPrompt }];

  if (knowledgeBase && Object.keys(knowledgeBase).length > 0) {
    contentParts.push({ text: `\n\n--- USER'S STRUCTURED KNOWLEDGE BASE (JSON) ---\n${JSON.stringify(knowledgeBase, null, 2)}` });
  }

  if (pdfs.length > 0) {
     contentParts.push({ text: `\n\n--- USER'S PREVIOUS CVS (PDFs) ---\nAnalyze the following PDF files for additional information.` });
     pdfs.forEach(pdf => {
        contentParts.push({
            inlineData: {
                mimeType: pdf.mimeType,
                data: pdf.data,
            }
        });
     });
  }

  contentParts.push({ text: `\n\n--- JOB DESCRIPTION TO TARGET ---\n${jobDescription}` });
  contentParts.push({ text: `\n\nNow, generate the tailored resume as a valid JSON object adhering to the provided schema.` });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: contentParts },
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      },
    });

    const jsonText = response.text.trim();
    const tailoredResume: TailoredResume = JSON.parse(jsonText);
    return tailoredResume;
  } catch (error) {
    console.error("Error generating tailored resume with Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
