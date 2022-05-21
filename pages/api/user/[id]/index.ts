import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DiscordUser } from '../../../../types/discord';

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

        return res.status(200).json(data);
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
