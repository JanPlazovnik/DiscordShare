import { useState, useEffect } from 'react';
import { DiscordUser } from '../types/discord'
import { Badges } from '../constants';
import Image from './Image';

// Import all SVGs
import partner from '../public/badges/partner.svg';
import balance from '../public/badges/balance.svg';
import bravery from '../public/badges/bravery.svg';
import brilliance from '../public/badges/brilliance.svg';
import bug_hunter from '../public/badges/bug_hunter.svg';
import bug_hunter_2 from '../public/badges/bug_hunter_2.svg';
import discord_certified_moderator from '../public/badges/discord_certified_moderator.svg';
import early_supporter from '../public/badges/early_supporter.svg';
import early_verified_developer from '../public/badges/early_verified_developer.svg';
import staff from '../public/badges/staff.svg';
import active_developer from '../public/badges/active_developer.svg';
import hypesquad from '../public/badges/hypesquad.svg';
import verified_bot from '../public/badges/verified_bot.svg';

import { getAvatarURL, getBannerURL, getDefaultAvatar } from '../utils';

interface UserBadge {
    name: string;
    src: string;
}

function BotTag({ verified }: { verified: boolean }) {
    return (
        <div className='user-bot'>
            {verified && <img className='verified-bot' src={verified_bot.src} alt='Verified Bot' />}
            <span>BOT</span>
        </div>
    );
}

export default function ProfileCard({ user }: { user: DiscordUser }) {
    const [badges, setBadges] = useState<UserBadge[]>([]);
    const [verified, setVerified] = useState(false);

    function fetchUserBadges() {
        const { public_flags } = user;
        const badges = [] as UserBadge[];

        if (!public_flags) return badges;

        if ((public_flags & Badges.STAFF) !== 0) {
            badges.push({ name: 'Staff', src: staff.src });
        }

        if ((public_flags & Badges.CERTIFIED_MODERATOR) !== 0) {
            badges.push({ name: 'Discord Certified Moderator', src: discord_certified_moderator.src });
        }

        if ((public_flags & Badges.PARTNER) !== 0) {
            badges.push({ name: 'Partnered Server Owner', src: partner.src });
        }

        if ((public_flags & Badges.HYPESQUAD) !== 0) {
            badges.push({ name: 'HypeSquad Events', src: hypesquad.src });
        }

        if ((public_flags & Badges.HYPESQUAD_ONLINE_HOUSE_1) !== 0) {
            badges.push({ name: 'HypeSquad Bravery', src: bravery.src });
        }

        if ((public_flags & Badges.HYPESQUAD_ONLINE_HOUSE_2) !== 0) {
            badges.push({ name: 'HypeSquad Brilliance', src: brilliance.src });
        }

        if ((public_flags & Badges.HYPESQUAD_ONLINE_HOUSE_3) !== 0) {
            badges.push({ name: 'HypeSquad Balance', src: balance.src });
        }

        if ((public_flags & Badges.BUG_HUNTER_LEVEL_1) !== 0) {
            badges.push({ name: 'Bug Hunter', src: bug_hunter.src });
        }

        if ((public_flags & Badges.BUG_HUNTER_LEVEL_2) !== 0) {
            badges.push({ name: 'Bug Hunter', src: bug_hunter_2.src });
        }

        if ((public_flags & Badges.ACTIVE_DEVELOPER) !== 0) {
            badges.push({ name: 'Active Developer', src: active_developer.src });
        }

        if ((public_flags & Badges.VERIFIED_DEVELOPER) !== 0) {
            badges.push({ name: 'Early Verified Bot Developer', src: early_verified_developer.src });
        }

        if ((public_flags & Badges.PREMIUM_EARLY_SUPPORTER) !== 0) {
            badges.push({ name: 'Early Nitro Supporter', src: early_supporter.src });
        }

        return badges
    }

    useEffect(() => {
        setBadges(fetchUserBadges());
        if (user.bot && user.public_flags && (user.public_flags & Badges.VERIFIED_BOT) !== 0) setVerified(true);
    }, [user]);

    return (
        <>
            <div className='profile-header'>
                {
                    user.banner
                        ? <Image className='profile-banner' src={getBannerURL(user, 'gif')} fallback={getBannerURL(user)} alt='' />
                        : <div className='profile-banner' style={{ backgroundColor: user.banner_color ?? '#ffffff' }} />
                }
                {
                    user.avatar
                        ? <Image className='profile-avatar' src={getAvatarURL(user, 'gif')} fallback={getAvatarURL(user)} alt='' />
                        : <div className='profile-avatar' style={{ backgroundImage: `url('${getDefaultAvatar(user)}')` }} />
                }
            </div>
            <div className='profile-info'>
                <div className='profile-user'>
                    <span className='user-name'>{user.global_name ?? user.username}</span>
                    {user.discriminator !== "0" && <span className='user-tag'>#{user.discriminator}</span> }
                    {user.bot && <BotTag verified={verified} />}
                </div>
                {
                    badges.length > 0 && (<div className='profile-badges'>
                        {badges.map(({ name, src }, index) => (<img className='badge' src={src} alt={name} title={name} key={index} />))}
                    </div>)
                }
                <a className='profile-btn' href={`https://discord.com/users/${user.id}`}>Add {user.global_name ?? user.username}</a>
            </div>
        </>
    )
}