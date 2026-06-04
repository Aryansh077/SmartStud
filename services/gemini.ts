
import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";
import { NewsItem, StudyAnalysis, CourseRecommendation, BookRecommendation, StudyPlanDay, RevisionNote, Certification, TrustedResource } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fetches "Selected & Trusted" resources using high-authority search grounding.
 */
export async function fetchTrustedResources(field: string): Promise<TrustedResource[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Identify the 6 most TRUSTED and OFFICIAL resources for students in "${field}". 
      PRIORITIZE:
      1. Official Government Portals (.gov).
      2. Top-tier Global University Open Courseware (e.g., MIT, Harvard, IIT).
      3. Recognized Professional Bodies/Councils.
      4. Open Access Research Archives.
      
      EXCLUDE: Low-quality blog posts, generic listicles, or unverified YouTube channels.
      
      Return as JSON.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['Official', 'University', 'Research', 'Verified Portal'] },
                  link: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    return data.resources || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCertifications(field: string): Promise<Certification[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Find 6 highly valuable professional certifications for students in "${field}". 
      Split them into 3 Free (or easily accessible via financial aid) and 3 Paid industry-standard ones.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            certs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  cost: { type: Type.STRING, enum: ['Free', 'Paid'] },
                  link: { type: Type.STRING },
                  value: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    return data.certs || [];
  } catch (error) { return []; }
}

export async function fetchFieldNews(field: string): Promise<{ text: string, news: NewsItem[] }> {
  const ai = getAI();
  const prompt = `Act as a news aggregator for students in ${field}. Sections: Important Dates, Jobs/Vacancies, Latest Updates. CITE SOURCES using markdown links.`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });
    const text = response.text || "No updates found.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const news: NewsItem[] = chunks.filter((c: any) => c.web).map((c: any) => ({
      title: c.web.title,
      uri: c.web.uri,
    }));
    return { text, news };
  } catch (error) { return { text: "Failed to load news.", news: [] }; }
}

export async function createMasterMentorSession(field: string): Promise<Chat> {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are the "Academic Master Mentor" for ${field}. STRICTLY academic only. Refuse non-study queries.`,
    }
  });
}

export async function fetchTopCourses(field: string): Promise<CourseRecommendation[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: `Find 5 highly recommended online courses for "${field}".`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            courses: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, provider: { type: Type.STRING }, platform: { type: Type.STRING }, rating: { type: Type.STRING }, link: { type: Type.STRING }, description: { type: Type.STRING } } } },
          },
        },
      },
    });
    return JSON.parse(response.text || "{}").courses || [];
  } catch (error) { return []; }
}

export async function fetchBooks(field: string): Promise<BookRecommendation[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `List 5 essential books or textbooks for students studying "${field}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            books: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, author: { type: Type.STRING }, isFree: { type: Type.BOOLEAN }, link: { type: Type.STRING }, description: { type: Type.STRING } } } },
          },
        },
      },
    });
    return JSON.parse(response.text || "{}").books || [];
  } catch (error) { return []; }
}

export async function fetchSyllabus(field: string): Promise<string> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Detailed curriculum and syllabus overview for "${field}". Use Markdown.`,
      config: { tools: [{ googleSearch: {} }] },
    });
    return response.text || "No syllabus available.";
  } catch (error) { return "Failed to load syllabus."; }
}

export async function editDiagram(base64ImageData: string, prompt: string): Promise<string | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [ { inlineData: { data: base64ImageData, mimeType: 'image/png' } }, { text: prompt } ] },
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return part.inlineData.data;
    }
    return null;
  } catch (error) { return null; }
}

export async function analyzeTopic(query: string, field: string): Promise<StudyAnalysis | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Master breakdown of "${query}" for "${field}".`,
      config: {
        thinkingConfig: { thinkingBudget: 1500 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            conceptualBreakdown: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { concept: { type: Type.STRING }, explanation: { type: Type.STRING }, analogy: { type: Type.STRING } } } },
            misconceptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            roadmap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { phase: { type: Type.STRING }, details: { type: Type.STRING } } } },
            subTopics: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, weightage: { type: Type.STRING }, description: { type: Type.STRING } } } },
            questionTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
            resources: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, type: { type: Type.STRING } } } },
            pros: { type: Type.ARRAY, items: { type: Type.STRING } },
            cons: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    });
    return JSON.parse(response.text || "null");
  } catch (error) { return null; }
}

export async function createStudyPlan(field: string, daysRemaining: number, hoursPerDay: number): Promise<StudyPlanDay[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Study plan for "${field}" with ${daysRemaining} days and ${hoursPerDay} hrs/day.`,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }, 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plan: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { day: { type: Type.STRING }, focus: { type: Type.STRING }, tasks: { type: Type.ARRAY, items: { type: Type.STRING } }, tips: { type: Type.STRING } } } },
          },
        },
      },
    });
    return JSON.parse(response.text || "{}").plan || [];
  } catch (error) { return []; }
}

export async function getRevisionNotes(field: string, topic: string): Promise<RevisionNote | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Short notes for "${topic}" in "${field}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            formulasOrDates: { type: Type.ARRAY, items: { type: Type.STRING } },
            mnemonics: { type: Type.ARRAY, items: { type: Type.STRING } },
            mistakesToAvoid: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    });
    return JSON.parse(response.text || "null");
  } catch (error) { return null; }
}

export const liveClient = () => getAI().live;
