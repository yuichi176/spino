'use strict';

const functions = require('@google-cloud/functions-framework');
const Firestore = require('@google-cloud/firestore');
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { Configuration, OpenAIApi } = require("openai");

// https://cloud.google.com/docs/authentication/production?hl=ja#providing_credentials_to_your_application
// Create a client that uses Application Default Credentials (ADC):
const firestore = new Firestore();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are an expert in wildlife.",});

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

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

    // openAI API から生物情報を生成
    // const openai = new OpenAIApi(configuration);
    // openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: "実在する動物を紹介してください。次のJSON文字列形式で日本語で出力してください。`{\"name\":\"名前\",\"habitat\":\"生息地(国・地域)\",\"description\":\"説明(150文字以内)\",\"trivia\":\"豆知識(100文字以内)\"}`",
    //     temperature: 0.8,
    //     max_tokens: 500,
    // }).then((response) => {
    //     try {
    //         console.log(response.data.choices[0].text)
    //         const wildLife = JSON.parse(response.data.choices[0].text);
    //         wildLife.createdAt = formattedDate
    //
    //         // firestoreに保存
    //         const docRef = firestore.collection(process.env.COLLECTION_NAME).doc();
    //         docRef.set(wildLife).then(r => console.log(`${formattedDate}: success update!`));
    //     } catch (error) {
    //         // These WILL be reported to Error Reporting
    //         throw new Error(error)
    //     }
    // });
});
