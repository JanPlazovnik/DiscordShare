import axios from 'axios';
import { createCanvas, loadImage } from 'canvas';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DiscordUser } from '../../../../../types/discord';
import { getDefaultAvatar } from '../../../../../utils';
import { getAvatarURL, getBannerURL } from '../../../../../utils/index';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            status: 400,
            message: 'Bad request - User ID was not given.',
        });
    }

    try {
        const { data } = (await axios.get(
            `https://discordapp.com/api/users/${id}`,
            { headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` } }
        )) as { data: DiscordUser };

        const { avatar, banner_color } = data;

        const canvas = createCanvas(500, 210);
        const ctx = canvas.getContext('2d');

        // Fill background
        ctx.fillStyle = "#36393f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Fill banner (images are not worth it because they will be stretched)
        ctx.fillStyle = banner_color ?? "#ffffff";
        ctx.fillRect(0, 0, canvas.width, 130);

        // Draw avatar
        const avatarUrl = avatar ? getAvatarURL(data) : getDefaultAvatar(data);
        const avatarData = await loadImage(avatarUrl);

        ctx.save();
        ctx.resetTransform();
        ctx.beginPath();
        ctx.arc(75, 138, 60, 0, 360);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#36393f";
        ctx.stroke();
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatarData, 12, 75);
        ctx.restore();

        // Draw username and discriminator
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px sans-serif";
        ctx.fillText(`${data.username}#${data.discriminator}`, 165, 45 + 128);
        // ctx.fillText(`${data.username}#${data.discriminator}`, 20, 230);

        res.writeHead(200, {
            'Content-Type': 'image/png',
        });

        canvas.createPNGStream().pipe(res);
    } catch (e: any) {
        if (e.response.status === 404) {
            return res.status(404).json({
                status: 404,
                message: 'Unknown User',
            });
        }
        
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}