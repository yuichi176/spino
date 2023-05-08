'use strict';

const functions = require('@google-cloud/functions-framework');
const Firestore = require('@google-cloud/firestore');
const { Configuration, OpenAIApi } = require("openai");

// https://cloud.google.com/docs/authentication/production?hl=ja#providing_credentials_to_your_application
// Create a client that uses Application Default Credentials (ADC):
const firestore = new Firestore();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

functions.cloudEvent('updateWildlifeInfo', cloudEvent => {

    // 明日の日付を取得 'YYYY-MM-DD'
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedDate = tomorrow.toISOString().slice(0, 10);

    // chatGPTから生物情報を生成
    const openai = new OpenAIApi(configuration);
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: "適当な生物を1つ選んで'{name, habitat(国・地域), description(300文字以内), trivia((100文字以内)}'のJSON形式で日本語で紹介してください。",
        temperature: 0.8,
        max_tokens: 500,
    }).then((response) => {
        const wildLife = JSON.parse(response.data.choices[0].text);
        wildLife.createdAt = formattedDate

        // firestoreに保存
        const docRef = firestore.collection(process.env.COLLECTION_NAME).doc();
        docRef.set(wildLife).then(r => console.log(`${formattedDate}: success update!`));
        });
});
