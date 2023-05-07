import {useState} from "react";
import {getBeforeDate, getNextDate, getToday} from "@/utils";
import {WildlifeInfo} from "../../gen-src";
import axios from "axios";
import { env } from '@/config/env'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useSWRImmutable from "swr/immutable";

export default function Home() {
  const [date, setDate] = useState(getToday())
  const [isBefore, setIsBefore] = useState(true)
  const [isNext, setIsNext] = useState(false)
  const { data: wildlife, error, isLoading } =
      useSWRImmutable<WildlifeInfo>(
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

  const getBefore = () => {
    const beforeDate = getBeforeDate(date)
    if (beforeDate === '2023-05-05') {
      setIsBefore(false)
    }
    setIsNext(true)
    setDate(beforeDate)
  }

  const getNext = () => {
    const nextDate = getNextDate(date)
    if (nextDate === getToday()) {
      setIsNext(false)
    }
    setIsBefore(true)
    setDate(nextDate)
  }

  return (
    <main
      className="flex flex-col items-center justify-between py-10 px-5"
    >
      <h1 className="text-lg mb-5">本日のいきもの</h1>
      <div className="max-w-md h-[500px] shadow-#1 box-border py-8 px-10 rounded-md mb-5">
        <div　className="tracking-wider">
          <p className="text-xs mb-2">{wildlife?.createdAt}</p>
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
      <div className="w-full max-w-md flex justify-between">
        {isBefore?
          <div className="cursor-pointer" onClick={getBefore}>
          <NavigateBeforeIcon />
          </div> : <div></div>
        }
        {isNext?
            <div className="cursor-pointer" onClick={getNext}>
              <NavigateNextIcon />
            </div> : <div></div>
        }
      </div>
    </main>
  )
}
