const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
  try {
    const { message, history } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const chatHistory = (history || []).map(h => ({
      role: h.role === 'assistant' ? 'model' : h.role,
      parts: [{ text: h.content }],
    }));

    let response;
    try {
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(message);
      response = result.response.text();
    } catch (apiError) {
      console.log('AI API Error (falling back to mock):', apiError.message);
      response = `Here is a mock response for: "${message}". To get real AI responses, please configure a valid GEMINI_API_KEY in your backend .env file.`;
    }

    // Track usage safely
    if (req.user) {
      req.user.aiQueriesUsed = (req.user.aiQueriesUsed || 0) + 1;
      if (typeof req.user.save === 'function') {
        await req.user.save();
      }
    }

    res.json({ response, queriesUsed: req.user?.aiQueriesUsed || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.summarize = async (req, res) => {
  try {
    const { text, url } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Summarize the following content in clear, concise bullet points suitable for a student studying for exams. Include key concepts, definitions, and important formulas if any:\n\n${text}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty, count } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Generate ${count || 5} multiple-choice quiz questions about "${topic}" at ${difficulty || 'medium'} difficulty level. Return as JSON array with format: [{"question": "...", "options": ["A", "B", "C", "D"], "correct": 0, "explanation": "..."}]`;
    const result = await model.generateContent(prompt);
    let quiz = result.response.text();

    // Try to parse JSON from response
    const jsonMatch = quiz.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      quiz = JSON.parse(jsonMatch[0]);
    }

    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
