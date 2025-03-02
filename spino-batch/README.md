# spino-batch

## Runtime
* Node.js 20

## Environment Variables
### Runtime Environment Variables
| Name            | Description         |
|:----------------|:--------------------|
| COLLECTION_NAME | 接続先のfirestoreコレクション |
| OPENAI_API_KEY  | OpenAI APIキー        |

### Publish Event 
#### to prod env
```shell
gcloud pubsub topics publish update-wildlife-info --message="test-prod"
```
#### to dev env
```shell
gcloud pubsub topics publish update-wildlife-info-dev --message="test-dev"
```
