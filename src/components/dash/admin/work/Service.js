import { GoogleGenerativeAI } from '@google/generative-ai';

const genAi = new GoogleGenerativeAI("AIzaSyCKzS0CXjNlFeZO4u5kil0ySTnFiwCj-GQ");

const model = genAi.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const r = await model.generateContent("Top 3 pemrograman populer");

console.table(r.response.text());