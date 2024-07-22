import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from '@/config/env'
import { wildlifeClient } from '@/libs/api-client/wildlifeClient'

export default async function wildLifeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const { date } = req.query
        if (env.USE_MOCK_DATA) {
          res.status(200).send(mockWildlife)
        } else {
          const { data: wildlife } = await wildlifeClient.getWildlife(date as string)
          res.status(200).send(wildlife)
        }
      } catch (error) {
        console.error(`fail to get collections:${(error as Error).message}`)
        console.error(error)
        res.status(500).json(error)
      }
      break
    default:
      res.status(405).send(`Method ${method} Not Allowed`)
  }
}

const mockWildlife = {
  name: 'レッサーパンダ',
  habitat: 'ヒマラヤ地域、中国、ネパール、インド',
  description:
    'レッサーパンダは、小型哺乳動物であり、外見はクマとネコに似ています。彼らは主に竹を食べ、葉、果物、昆虫、鳥卵も食べます。彼らは木の上で生活し、しばしば昼間は寝ています。彼らは非常にかわいらしい外見で人気がありますが、野生種は絶滅が危惧されています。',
  trivia: 'レッサーパンダは、竹を消化するために特別な細菌を持っています。',
  createdAt: 'レッサーパンダは、竹を消化するために特別な細菌を持っています。2024-07-23',
}
