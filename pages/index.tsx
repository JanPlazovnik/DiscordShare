import Head from 'next/head';
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ProfileCard from "../components/ProfileCard"
import { DiscordUser } from '../types/discord';
import background from '../public/discord_background.svg';

export default function Home() {
    const [user, setUser] = useState<DiscordUser | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        async function fetchData() {
            try {
                const { data } = await axios.get(`/api/user/${id}`);
                setUser(data);
            } catch (e: any) {
                console.error(e);
            }
        }

        fetchData();
    }, [router.isReady]);

    function getMetaTags() {
        if (!user) return null
        return (
            <>
                <meta name="og:title" content={`Add ${user.username}#${user.discriminator} on Discord`}/>
                <meta name="og:image" content={process.env.EMBED_API?.replace('<id>', user.id)}/>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{user ? user.username : "Discord Profile"}</title>
                { getMetaTags() }
            </Head>
            <div className="wrapper" style={{backgroundImage: `url(${background.src})`}}>
                <div className="box">
                    {
                        user
                            ? <ProfileCard user={user} />
                            : <p style={{ padding: "20px", margin: 0 }}>Loading...</p>
                    }
                </div>
                <a href="https://github.com/JanPlazovnik/DiscordShare" className="footer-url">GitHub</a>
            </div>
        </>
    );
}