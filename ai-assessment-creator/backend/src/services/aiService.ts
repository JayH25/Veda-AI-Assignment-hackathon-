export const generateQuestionPaper = async (formData: any): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // This perfectly matches the Mongoose schema requirements
            const mockOutput = {
                sections: [
                    {
                        title: "Section A: Objective",
                        instructions: "Attempt all questions in this section.",
                        questions: [
                            {
                                text: "What is the powerhouse of the cell?",
                                difficulty: "Easy",
                                marks: 1,
                                type: "Multiple Choice Questions"
                            },
                            {
                                text: "Explain the theory of relativity.",
                                difficulty: "Challenging",
                                marks: 5,
                                type: "Short Questions"
                            }
                        ]
                    }
                ]
            };
            
            // Return it as a JSON string, exactly how an LLM would
            resolve(JSON.stringify(mockOutput));
        }, 3000); // 3 second delay to simulate AI thinking
    });
};