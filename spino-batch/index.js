'use strict';

const functions = require('@google-cloud/functions-framework');
const Firestore = require('@google-cloud/firestore');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// https://cloud.google.com/docs/authentication/production?hl=ja#providing_credentials_to_your_application
// Create a client that uses Application Default Credentials (ADC):
const firestore = new Firestore();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are an expert in wildlife.",});

functions.cloudEvent('updateWildlifeInfo', async (cloudEvent) => {
    try {
        // 明日の日付を取得 'YYYY-MM-DD'形式
        const timezoneOffset = 9; // UTC+9を表すタイムゾーンオフセット（単位は時間）
        const tomorrow = new Date(Date.now() + (24 * 60 * 60 * 1000) + (timezoneOffset * 60 * 60 * 1000));
        const formattedDate = tomorrow.toISOString().slice(0, 10);

        // 生物情報の生成
        const prompt = "Please introduce a real wildlife in Japanese. Each time, introduce a different species from various regions and classifications such as ハシビロコウ, ダチョウ.\\n\\n Using this JSON schema:\\n\\n WildLife = {\"name\": str, \"habitat\": str, \"description\": str, \"trivia: str\"}\\n\\n Ensure that the \"description\" and \"trivia\" fields are approximately 150 characters each.\\n\\n Return a `WildLife`"
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: prompt,
                        }
                    ],
                }
            ],
            generationConfig: {
                temperature: 0.9,
                response_mime_type: "application/json"
            },
        });
        const rawWildLife = result.response.text();
        console.log(rawWildLife)
        const wildLife = JSON.parse(rawWildLife)
        wildLife.createdAt = formattedDate

        // firestoreに保存
        const docRef = firestore.collection(process.env.COLLECTION_NAME).doc();
        docRef.set(wildLife).then(r => console.log(`${formattedDate}: success update!`));
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
});
