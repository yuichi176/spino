# spino-batch

## Runtime
* Node.js 18

## Environment Variables
### Runtime Environment Variables
| Name            | Description         |
|:----------------|:--------------------|
| COLLECTION_NAME | 接続先のfirestoreコレクション |
| OPENAI_API_KEY  | OpenAI APIキー        |

## Command
### Manual Deploy
```shell
$ gcloud functions deploy update-wildlife-info-function \             
--gen2 \
--runtime=nodejs18 \
--region=asia-northeast1 \
--source=. \
--entry-point=updateWildlifeInfo \
--trigger-topic=update-wildlife-info \
--set-env-vars \
COLLECTION_NAME=WildlifeInfo
```

### Publish Event 
#### to prod env
```shell
$ gcloud pubsub topics publish update-wildlife-info --message="test-prod"
```
#### to dev env
```shell
$ gcloud pubsub topics publish update-wildlife-info-dev --message="test-dev"
```
