import Head from 'next/head';
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ProfileCard from "../components/ProfileCard"
import { DiscordUser } from "./api/user/[id]"

export default function Home() {
  const [user, setUser] = useState<DiscordUser|null>(null)
  const router = useRouter()
  const {id} = router.query

  useEffect(() => {
    if (!router.isReady) return

    async function fetchData() {
      try {
        const {data} = await axios.get(`/api/user/${id}`)
        setUser(data)
      } catch (e: any) {
        console.error(e)
      }
    }

    fetchData()
  }, [router.isReady])

  return (
    <>
      <Head>
        <title>{ user ? user.username : "Discord Profile" }</title>
      </Head>
      <div className="wrapper">
        <div className="box">
          {
            user
            ? <ProfileCard user={user}/>
            : <p style={{padding: "20px", margin: 0}}>Loading...</p>
          }
        </div>
        <a href="https://github.com/JanPlazovnik/DiscordShare" className="footer-url">GitHub</a>
      </div>
    </>
  )
}