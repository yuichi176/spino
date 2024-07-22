import { useState } from 'react'
import { getBeforeDate, getNextDate, getToday } from '@/utils'
import { WildlifeInfo } from '../../gen-src'
import axios from 'axios'
import { env } from '@/config/env'
import useSWRImmutable from 'swr/immutable'
import styles from './Home.module.css'

export default function Home() {
  const [date, setDate] = useState(getToday())
  const [isBefore, setIsBefore] = useState(true)
  const [isNext, setIsNext] = useState(false)

  const {
    data: wildlife,
    error,
    isLoading,
  } = useSWRImmutable<WildlifeInfo>(
    `${env.BFF_PROTOCOL}://${env.BFF_BASE_DOMAIN}/api/wildlifes?date=${date}`,
    (url) => axios.get(url).then((res) => res.data),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 500では再試行しない。TODO: beで404を返すようになったら404に修正
        if (error.status === 500) return
      },
    },
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

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <img src="/images/ty-logo.PNG" alt="today's wildlife logo" />
          </div>
          <p className={styles.loadingMessage}>読み込み中</p>
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className={styles.copyRight}>© 2023 Yuichi Sugiyama.</p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src="/images/ty-logo.PNG" alt="today's wildlife logo" />
        </div>
        <div className={styles.ContentContainer}>
          {error ? (
            <>
              <h1 className={styles.name}>レッサーパンダ</h1>
              <p className={styles.habitat}>ヒマラヤ地域、中国、ネパール、インド</p>
              <p className={styles.description}>
                レッサーパンダは、小型哺乳動物であり、外見はクマとネコに似ています。彼らは主に竹を食べ、葉、果物、昆虫、鳥卵も食べます。彼らは木の上で生活し、しばしば昼間は寝ています。彼らは非常にかわいらしい外見で人気がありますが、野生種は絶滅が危惧されています。
              </p>
              <p className={styles.trivia}>
                レッサーパンダは、竹を消化するために特別な細菌を持っています。
              </p>
            </>
          ) : (
            <>
              <h1 className={styles.name}>{wildlife?.name}</h1>
              <p className={styles.habitat}>{wildlife?.habitat}</p>
              <p className={styles.description}>{wildlife?.description}</p>
              <p className={styles.trivia}>{wildlife?.trivia}</p>
            </>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.leftButton}
            onClick={getBefore}
            type="button"
            disabled={!isBefore}
          ></button>
          <div>
            <a
              href={`https://ja.wikipedia.org/wiki/${wildlife?.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.wikiLinkContainer}
            >
              <img
                src="/images/ty-icon1.png"
                alt="wiki link icon"
                className={styles.wikiLinkIcon}
              />
              <p className={styles.wikiLinkText}>wiki</p>
            </a>
          </div>
          <button
            className={styles.rightButton}
            onClick={getNext}
            type="button"
            disabled={!isNext}
          ></button>
        </div>
        <p className={styles.copyRight}>© 2024 Yuichi Sugiyama.</p>
      </div>
    </main>
  )
}
