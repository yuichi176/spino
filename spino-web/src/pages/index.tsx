import {useState} from "react";
import {getBeforeDate, getNextDate, getToday} from "@/utils";
import {WildlifeInfo} from "../../gen-src";
import axios from "axios";
import { env } from '@/config/env'
import useSWRImmutable from "swr/immutable";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Home() {
  const [date, setDate] = useState(getToday())
  const [isBefore, setIsBefore] = useState(true)
  const [isNext, setIsNext] = useState(false)
  const { data: wildlife, error, isLoading } =
      useSWRImmutable<WildlifeInfo>(
          `${env.BFF_PROTOCOL}://${env.BFF_BASE_DOMAIN}/api/wildlifes?date=${date}`,
          (url) => axios.get(url).then(res => res.data),
          {
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
              // 500では再試行しない。TODO: beで404を返すようになったら404に修正
              if (error.status === 500) return
            }
          }
      )

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
      className="flex flex-col justify-center items-center tracking-wide"
    >
      <div className="w-auto h-[844px] max-w-[390px] bg-ty-background relative md:mt-[50px]">
        <img src="/images/ty-logo.PNG" alt="today's wildlife logo" className="w-[184px] absolute top-[90px] left-1/2 translate-x-[-50%]" />
        {!isLoading? <>
          <div className="mt-[200px] mx-auto pl-[5px] w-[60%] min-w-[250px] font-kosugi-maru">
            <h1 className="text-center text-[22px] mb-[5px]"><span className="text-highlight-blue">{!error ? wildlife?.name: "レッサーパンダ"}</span></h1>
            <p className="text-center text-[14px] text-[#1C77A6] mb-[20px] underline underline-offset-4">{!error ? wildlife?.habitat: "ヒマラヤ地域、中国、ネパール、インド"}</p>
            <p className="text-[14px] text-[#123866] mb-[15px]">{!error ? wildlife?.description: "レッサーパンダは、小型哺乳動物であり、外見はクマとネコに似ています。彼らは主に竹を食べ、葉、果物、昆虫、鳥卵も食べます。彼らは木の上で生活し、しばしば昼間は寝ています。彼らは非常にかわいらしい外見で人気がありますが、野生種は絶滅が危惧されています。"}</p>
            <p className="text-[14px] text-[#123866]">{!error ? wildlife?.trivia: "レッサーパンダは、竹を消化するために特別な細菌を持っています。"}</p>
          </div>
          <div className="absolute top-[610px] left-1/2 translate-x-[-50%] flex items-center font-kosugi-maru">
            <div>
            {isBefore?
              <div className="w-[55px] flex justify-center items-center cursor-pointer">
              <ArrowLeftIcon style={{ color: '#D7494A', fontSize: '40px' }} onClick={getBefore} />
              </div> : <div className="w-[55px]"></div>
            }
            </div>
            <div className="flex flex-col justify-between items-center w-[90px]">
              <a href ={`https://ja.wikipedia.org/wiki/${!error ? wildlife?.name : "レッサーパンダ"}`} target="_blank" rel="noopener noreferrer">
              <img src="/images/ty-icon1.png" alt="today's wildlife icon" className="w-[40px] mx-auto" />
              <p className="font-kosugi-maru text-[10px] text-[#0e2c52] tracking-tight mt-[-3px] underline underline-offset-2 decoration-2 decoration-[#83BD9C]">check wiki</p>
              </a>
            </div>
            <div>
            {isNext?
              <div className="w-[55px] flex justify-center items-center cursor-pointer">
              <ArrowRightIcon style={{ color: '#D7494A', fontSize: '40px' }}  onClick={getNext} />
              </div> : <div className="w-[55px]"></div>
            }
            </div>
          </div>
        </> : <>
          <div className="w-[390px] min-w-[250px]"></div>
          <p className="absolute top-[380px] left-1/2 translate-x-[-50%] font-kosugi-maru tracking-wide text-[#252525]">読み込み中</p>
          <div className="loader">
            <div className="absolute top-[382px] left-[calc(50%+53px)] translate-x-[-50%] loader-inner ball-pulse-sync">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
        }
        <p className="absolute top-[685px] left-1/2 translate-x-[-50%] text-[8px]">© 2023 Yuichi Sugiyama.</p>
      </div>
    </main>
  )
}
