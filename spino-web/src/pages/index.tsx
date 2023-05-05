import {useState} from "react";
import {getToday} from "@/utils";
import useSWR from "swr";
import {WildlifeInfo} from "../../gen-src";
import axios from "axios";
import { env } from '@/config/env'

export default function Home() {
  const [date, setDate] = useState(getToday())
  const { data: wildlife, error, isLoading } =
      useSWR<WildlifeInfo>(
          `${env.BFF_PROTOCOL}://${env.BFF_BASE_DOMAIN}/api/wildlifes?date=${date}`,
          (url) => axios.get(url).then(res => res.data)
      )
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <main
      className={`flex flex-col items-center justify-between p-24`}
    >
      <h1>本日のいきもの</h1>
      <div>
        <p>{wildlife?.name}</p>
        <p>{wildlife?.habitat}</p>
        <p>{wildlife?.description}</p>
        <p>{wildlife?.trivia}</p>
      </div>
    </main>
  )
}
