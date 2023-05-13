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

    // 明日の日付を取得 'YYYY-MM-DD'形式
    const timezoneOffset = 9; // UTC+9を表すタイムゾーンオフセット（単位は時間）
    const tomorrow = new Date(Date.now() + (24 * 60 * 60 * 1000) + (timezoneOffset * 60 * 60 * 1000));
    const formattedDate = tomorrow.toISOString().slice(0, 10);

    // chatGPTから生物情報を生成
    const openai = new OpenAIApi(configuration);
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: "実在する動物を紹介してください。次のJSON文字列形式で日本語で出力してください。`{\"name\":\"名前\",\"habitat\":\"生息地(国・地域)\",\"description\":\"説明(300文字以内)\",\"trivia\":\"豆知識(200文字以内)\"}`",
        temperature: 0.8,
        max_tokens: 500,
    }).then((response) => {
        try {
            console.log(response.data.choices[0].text)
            const wildLife = JSON.parse(response.data.choices[0].text);
            wildLife.createdAt = formattedDate

            // firestoreに保存
            const docRef = firestore.collection(process.env.COLLECTION_NAME).doc();
            docRef.set(wildLife).then(r => console.log(`${formattedDate}: success update!`));
        } catch (error) {
            // These WILL be reported to Error Reporting
            throw new Error(error)
        }
    });
});
