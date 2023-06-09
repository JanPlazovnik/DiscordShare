export interface DiscordUser {
    id: string;
    bot?: boolean;
    username: string;
    global_name: string;
    avatar: string;
    discriminator: string;
    public_flags?: number;
    banner?: string;
    banner_color?: string;
    accent_color?: string;
}