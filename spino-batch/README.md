## デプロイ時
```shell
$ gcloud functions deploy update-wildlife-info-function \             
--gen2 \
--runtime=nodejs18 \
--region=asia-northeast1 \
--source=. \
--entry-point=updateWildlifeInfo \
--trigger-topic=update-wildlife-info
```
