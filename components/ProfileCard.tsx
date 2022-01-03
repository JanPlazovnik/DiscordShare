import { DiscordUser } from "../pages/api/user/[id]"

export default function ProfileCard({ user }: { user: DiscordUser }) {
    function getAvatarURL(user: DiscordUser): string {
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
    }
    function getBannerURL(user: DiscordUser): string {
        return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=300`
    }
    return (
        <>
            <div className="profile-header">
                {
                    user.banner
                    ? <div className="profile-banner" style={{backgroundImage: `url('${getBannerURL(user)}')`}}/>
                    : <div className="profile-banner" style={{backgroundColor: user.banner_color ?? "#ffffff"}}/>
                }
                <img className="profile-avatar" src={getAvatarURL(user)}/>
            </div>
            <div className="profile-info">
                <p>{user.username}<span>#{user.discriminator}</span></p>    
                <a className="profile-btn" href={`https://discord.com/users/${user.id}`}>Add Friend</a>
            </div>
        </>
    )
}