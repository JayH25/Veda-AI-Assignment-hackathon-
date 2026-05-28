export const generateQuestionPaper = async (formData: any): Promise<string> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn('[Gemini Service] GEMINI_API_KEY is not defined. Falling back to dynamic Mock generator.');
        return generateMockPaper(formData);
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        const questionPrompt = formData.questions.map((q: any) => 
            `- Type: ${q.type}, Quantity: ${q.count}, Marks per Question: ${q.marks}`
        ).join('\n');

        const referenceNotes = formData.referenceFile && formData.referenceFile.content 
            ? `\nReference notes to base the questions on:\n"""\n${formData.referenceFile.content}\n"""`
            : '';

        const systemInstruction = `You are an expert assessment creator. Your task is to generate a high-quality question paper in strict JSON format. 
The output MUST match this JSON structure:
{
  "sections": [
    {
      "title": "Section Title (e.g. Section A: Objective)",
      "instructions": "Section instructions",
      "questions": [
        {
          "text": "The full text of the question",
          "difficulty": "Easy" or "Moderate" or "Challenging",
          "marks": 5, // number
          "type": "Multiple Choice Questions" or "Short Questions" or "Long Questions" or "Numerical Problems"
        }
      ]
    }
  ]
}
Do NOT include any explanations, markdown code blocks (like \`\`\`json), or additional text outside the JSON. Return only the valid raw JSON object.`;

        const userPrompt = `Generate a question paper for the subject "${formData.subject || 'General Knowledge'}".
Additional instructions: ${formData.additionalInstructions || 'None'}
Total marks required: ${formData.totalMarks}
Total questions: ${formData.totalQuestions}

Generate the following sections matching these question requirements:
${questionPrompt}
${referenceNotes}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemInstruction}\n\n${userPrompt}`
                    }]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API returned status ${response.status}: ${await response.text()}`);
        }

        const responseData = await response.json();
        const generatedText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!generatedText) {
            throw new Error('Invalid response structure from Gemini API');
        }

        let cleanJson = generatedText.trim();
        // Strip markdown ```json ... ``` wrapper if present
        if (cleanJson.startsWith('```')) {
            cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
        }

        return cleanJson.trim();
        
    } catch (error: any) {
        console.error('[Gemini API Error] Failed to generate:', error.message);
        console.warn('Falling back to dynamic Mock generator.');
        return generateMockPaper(formData);
    }
};

const generateMockPaper = async (formData: any): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockOutput = {
                sections: formData.questions.map((q: any, index: number) => ({
                    title: `Section ${String.fromCharCode(65 + index)}: ${q.type}`,
                    instructions: `Attempt all questions in this section. Each question is worth ${q.marks} marks.`,
                    questions: Array.from({ length: q.count }).map((_, qIdx) => ({
                        text: `Sample generated ${q.type.toLowerCase()} question ${qIdx + 1} regarding ${formData.subject || 'General Knowledge'}.${formData.additionalInstructions ? ` (Instruction: ${formData.additionalInstructions})` : ''}`,
                        difficulty: qIdx % 3 === 0 ? "Easy" : qIdx % 3 === 1 ? "Moderate" : "Challenging",
                        marks: q.marks,
                        type: q.type
                    }))
                }))
            };
            resolve(JSON.stringify(mockOutput));
        }, 3000);
    });
};