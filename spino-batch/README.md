## 手動デプロイ
```shell
$ gcloud functions deploy update-wildlife-info-function \             
--gen2 \
--runtime=nodejs18 \
--region=asia-northeast1 \
--source=. \
--entry-point=updateWildlifeInfo \
--trigger-topic=update-wildlife-info
```

## イベントのパブリッシュ
### 本番環境
```shell
$ gcloud pubsub topics publish update-wildlife-info --message="test"
```
### 開発環境
```shell
$ gcloud pubsub topics publish update-wildlife-info-dev --message="test"
```
