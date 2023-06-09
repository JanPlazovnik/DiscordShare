import { DiscordUser } from "../types/discord";

export function getAvatarURL(
  user: DiscordUser,
  ext: "png" | "gif" = "png"
): string {
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
}

export function getBannerURL(
  user: DiscordUser,
  ext: "png" | "gif" = "png"
): string {
  return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=300`;
}

export function getDefaultAvatar(user: DiscordUser): string {
  const { discriminator, id } = user;

  const digit =
    discriminator === "0"
      ? // migrated accounts use the id
        Math.abs((Number(id) >> 22) % 6)
      : // legacy username system still uses the discriminator
        Number(discriminator) % 5;

  return `https://cdn.discordapp.com/embed/avatars/${digit}.png`;
}
