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
  if (isLoading) return (
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="bouncybox">
          <div className="bouncy"></div>
        </div>
        <p>loading</p>
      </div>
  )
  if (error) return <div>Failed to load</div>;

  return (
    <main
      className="flex flex-col items-center justify-between py-10 px-5"
    >
      <h1 className="text-lg mb-5">本日のいきもの</h1>
      <div className="max-w-md shadow-#1 box-border p-10 rounded-md">
        <div>
          <div className="mb-5">
            <p className="text-lg font-bold">{wildlife?.name}</p>
            <p className="text-sm">{wildlife?.habitat}</p>
          </div>
          <p className="mb-5 text-sm">{wildlife?.description}</p>
          <div>
            <h1 className="text-[#008080] font-bold">豆知識</h1>
            <p className="text-sm">{wildlife?.trivia}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
