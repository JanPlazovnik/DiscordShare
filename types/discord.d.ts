import { Premium } from '../constants';

export interface DiscordUser {
    id: string;
    bot?: boolean;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags?: number;
    premium_type?: Premium;
    banner?: string;
    banner_color?: string;
    accent_color?: string;
}