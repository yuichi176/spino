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
          (url) => axios.get(url).then(res => res.data)
      )
  if (isLoading) return (
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="bouncybox">
          <div className="bouncy"></div>
        </div>
        <p className="font-kosugi-maru">loading...</p>
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
      className="flex flex-col justify-center items-center tracking-wide"
    >
      <div className="w-auto h-[844px] max-w-[390px] bg-ty-background relative md:mt-[50px]">
        <img src="/images/ty-logo.PNG" alt="today's wildlife logo" className="w-[184px] absolute top-[90px] left-1/2 translate-x-[-50%]" />
        <div className="mt-[200px] mx-auto pl-[5px] w-[60%] min-w-[250px] font-kosugi-maru">
          <h1 className="text-center text-[22px] mb-[5px]"><span className="text-highlight-blue">{wildlife?.name}</span></h1>
          <p className="text-center text-[14px] text-[#1C77A6] mb-[20px] underline underline-offset-4">{wildlife?.habitat}</p>
          <p className="text-[14px] text-[#164681] mb-[15px]">{wildlife?.description}</p>
          <p className="text-[14px] text-[#164681]">{wildlife?.trivia}</p>
        </div>
        <div className="absolute top-[610px] left-1/2 translate-x-[-50%] flex items-center font-kosugi-maru">
          <div>
            {isBefore?
                <div className="w-[55px] flex justify-center items-center cursor-pointer">
                  {/*<p className="text-[12px]">back</p>*/}
                  <ArrowLeftIcon style={{ color: '#D7494A', fontSize: '40px' }} onClick={getBefore} />
                </div> : <div className="w-[55px]"></div>
            }
          </div>
          <div className="flex flex-col justify-between items-center w-[90px]">
            <a href ={`https://ja.wikipedia.org/wiki/${wildlife?.name}`} target="_blank" rel="noopener noreferrer">
              <img src="/images/ty-icon1.png" alt="today's wildlife icon" className="w-[40px] mx-auto" />
              <p className="text-[10px] underline underline-offset-2 decoration-2 decoration-[#83BD9C]">Who am I?</p>
            </a>
          </div>
          <div>
            {isNext?
                <div className="w-[55px] flex justify-center items-center cursor-pointer">
                  <ArrowRightIcon style={{ color: '#D7494A', fontSize: '40px' }}  onClick={getNext} />
                  {/*<p className="text-[12px]">next</p>*/}
                </div> : <div className="w-[55px]"></div>
            }
          </div>
        </div>
        <p className="absolute top-[685px] left-1/2 translate-x-[-50%] text-[8px]">© 2023 Yuichi Sugiyama.</p>
      </div>
    </main>
  )
}
