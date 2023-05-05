'use strict';

const functions = require('@google-cloud/functions-framework');
const Firestore = require('@google-cloud/firestore');
const { Configuration, OpenAIApi } = require("openai");

const db = new Firestore({
    projectId: 'spino-385712',
    keyFilename: './spino-batch-service-account-key.json',
});
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

functions.cloudEvent('updateWildlifeInfo', cloudEvent => {

    // 現在の日付を取得
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

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
        const docRef = db.collection('WildlifeInfo').doc();
        docRef.set(wildLife).then(r => console.log(`${formattedDate}: success update!`));
        });
});
