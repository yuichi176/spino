'use strict';

const functions = require('@google-cloud/functions-framework');
const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    projectId: 'spino-385712',
    keyFilename: './spino-batch-service-account-key.json',
});

functions.cloudEvent('updateWildlifeInfo', cloudEvent => {
    const docRef = db.collection('WildlifeInfo').doc();

    // 現在の日付を取得
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // TODO: chatGPT APIから取得

    const wildLife = {
        name: "アカガエル",
        habitat: "北アメリカ",
        description: "アカガエルは、北アメリカ原産のカエルの一種で、赤や褐色の体色が特徴的です。夜行性で、昼間は木の下などで休息します。雑食性で、昆虫やミミズ、小型の爬虫類などを食べます。アカガエルは、皮膚から毒を分泌することができますが、一般的には人間に対して致命的ではありません。",
        trivia: "アカガエルは、気温が下がると冬眠状態に入ります。また、卵や幼体は水中で生活するため、水場の近くに生息することが多いです。",
        createdAt: formattedDate,
    };
    docRef.set(wildLife).then(r => console.log(`${formattedDate}: success update!`));
});
