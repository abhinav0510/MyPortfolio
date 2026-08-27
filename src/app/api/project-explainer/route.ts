import { NextResponse } from 'next/server';
import { projectsData } from '@/data/portfolioData';

export async function POST(req: Request) {
  try {
    const { projectId, prompt, messages = [] } = await req.json();

    const project = projectsData.find((p) => p.id === projectId);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const query = prompt || (messages.length > 0 ? messages[messages.length - 1].content : '');

    // System architecture context block
    const projectContext = {
      title: project.title,
      category: project.category,
      tags: project.tags.join(', '),
      description: project.description,
      longDescription: project.longDescription || project.description,
      architecture: project.aiContext?.architectureDiagramSummary || 'Standard microservices & API architecture.',
      challenges: project.aiContext?.keyChallengesSolved?.join('; ') || 'High throughput, low latency optimization.',
      highlights: project.aiContext?.systemDesignHighlights?.join('; ') || 'Scalable component structure.'
    };

    // If Google Gemini or OpenAI API Key is present in process.env, query the LLM model
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{
                  text: `You are an AI System Architect and Technical Voice Representative for Abhinav Srivastava. 
Your role is to explain the project "${projectContext.title}" to recruiters, technical leads, and visitors.

Project Specifications:
- Category: ${projectContext.category}
- Tech Stack: ${projectContext.tags}
- Description: ${projectContext.description}
- Long Overview: ${projectContext.longDescription}
- Architecture: ${projectContext.architecture}
- Key Challenges Solved: ${projectContext.challenges}
- Key Highlights: ${projectContext.highlights}

User Query: "${query}"

Guidelines:
1. Provide a concise, clear, and highly impressive technical response (2-4 sentences max).
2. Highlight system design, scalability, and engineering rationale.
3. Be conversational and ready for cross-questioning.`
                }]
              }
            ]
          })
        });

        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return NextResponse.json({ reply: replyText });
        }
      } catch (e) {
        console.error('Gemini API Error, falling back to smart engine:', e);
      }
    }

    // Smart Local AI Engine Fallback (Deterministic, High-Fidelity Answers)
    let reply = `In **${projectContext.title}**, we built a ${projectContext.category} solution leveraging **${projectContext.tags}**. `;

    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('scale') || lowerQuery.includes('scaling') || lowerQuery.includes('concurrency')) {
      reply = `**${projectContext.title}** scales efficiently using an architecture of ${projectContext.architecture}. Highlights include: ${projectContext.highlights}.`;
    } else if (lowerQuery.includes('challenge') || lowerQuery.includes('hard') || lowerQuery.includes('bug') || lowerQuery.includes('difficult')) {
      reply = `Key technical challenges tackled in **${projectContext.title}** include: ${projectContext.challenges}. We solved this by enforcing strict design patterns and schema validations.`;
    } else if (lowerQuery.includes('recruiter') || lowerQuery.includes('summary') || lowerQuery.includes('pitch') || lowerQuery.includes('3 sentences')) {
      reply = `**${projectContext.title}** is a flagship ${projectContext.category} system built by Abhinav Srivastava using **${projectContext.tags}**. It solves critical user problems through ${projectContext.description} and achieves sub-100ms performance metrics.`;
    } else if (lowerQuery.includes('architecture') || lowerQuery.includes('database') || lowerQuery.includes('backend') || lowerQuery.includes('orm') || lowerQuery.includes('design')) {
      reply = `Architecture Breakdown for **${projectContext.title}**: ${projectContext.architecture}. System Highlights: ${projectContext.highlights}.`;
    } else if (query.trim()) {
      reply = `Regarding **${projectContext.title}**: ${projectContext.longDescription} Key stack components include **${projectContext.tags}**. System architecture summary: ${projectContext.architecture}.`;
    } else {
      reply = `Hi! I'm the AI System Architect for **${projectContext.title}**. Ask me anything about the architecture, tech stack (${projectContext.tags}), or engineering challenges!`;
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Project Explainer Error:', error);
    return NextResponse.json({ error: 'Failed to generate explanation' }, { status: 500 });
  }
}
