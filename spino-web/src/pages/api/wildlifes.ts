import type { NextApiRequest, NextApiResponse } from 'next'
import {wildlifeClient} from "@/libs/api-client/wildlifeClient";

export default async function wildLifeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const { date } = req.query
        const { data: wildlife } = await wildlifeClient.getWildlife(date as string)
        res.status(200).send(wildlife)
      } catch (error) {
        console.error(`fail to get collections:${(error as Error).message}`)
        console.error(error)
        res.status(500).json(error)
      }
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}