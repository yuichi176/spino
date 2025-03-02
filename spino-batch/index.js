'use strict';

const functions = require('@google-cloud/functions-framework');
const Firestore = require('@google-cloud/firestore');
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const wildLifeSchema = {
    description: "野生生物の情報を表すスキーマ",
    type: SchemaType.OBJECT,
    properties: {
        name: {
            type: SchemaType.STRING,
            description: "野生生物の名前",
        },
        habitat: {
            type: SchemaType.STRING,
            description: "野生生物の生息地",
        },
        description: {
            type: SchemaType.STRING,
            description: "野生生物の特徴や生態に関する詳細な説明（150文字程度）",
        },
        trivia: {
            type: SchemaType.STRING,
            description: "野生生物に関する興味深い事実や豆知識（150文字程度）",
        }
    },
    required: [
        "name",
        "habitat",
        "description",
        "trivia"
    ],
}

// https://cloud.google.com/docs/authentication/production?hl=ja#providing_credentials_to_your_application
// Create a client that uses Application Default Credentials (ADC):
const firestore = new Firestore();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  {
      model: "gemini-2.0-flash",
      generationConfig:
        {
            responseMimeType: "application/json",
            responseSchema: wildLifeSchema
        }
  });

functions.cloudEvent('updateWildlifeInfo', async (_) => {
    try {
        // 明日の日付を取得 'YYYY-MM-DD'形式
        const timezoneOffset = 9; // UTC+9を表すタイムゾーンオフセット（単位は時間）
        const tomorrow = new Date(Date.now() + (24 * 60 * 60 * 1000) + (timezoneOffset * 60 * 60 * 1000));
        const formattedDate = tomorrow.toISOString().slice(0, 10);

        // 生物情報の生成
        const prompt = "Generate 30 different wildlife choosing from a wide variety of species, including mammals, birds, reptiles, amphibians, fish, and invertebrates from different habitats around the world. Then, randomly select and return only one of these 30 wildlife. Please provide the output in Japanese."
        const result = await model.generateContent(prompt);
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
