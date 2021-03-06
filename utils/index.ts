import { DiscordUser } from '../types/discord';

export function getAvatarURL(user: DiscordUser): string {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
}

export function getBannerURL(user: DiscordUser): string {
    return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=300`;
}

export function getDefaultAvatar(user: DiscordUser): string {
    const { discriminator } = user;
    const digit = parseInt(discriminator[3]);

    return `https://i.odstrani.se/personal/discord/default/${digit >= 5 ? digit - 5 : digit}.png`;
    // return `https://cdn.discordapp.com/embed/avatars/${digit >= 5 ? digit - 5 : digit}.png`;
}