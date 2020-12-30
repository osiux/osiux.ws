// @ts-ignore
import mailgun from 'mailgun.js';
import { NowRequest, NowResponse } from '@vercel/node';

type MessageBody = {
    name: string;
    email: string;
    url: string;
    message: string;
};

export default async (request: NowRequest, response: NowResponse) => {
    if (request.method === 'POST') {
        const { name, email, url, message }: MessageBody = request.body;

        if (url.trim().length > 0) {
            // try to avoid spam bots
            response.status(200).json({ message: 'ok' });
        } else {
            const mg = mailgun.client({
                username: 'api',
                key: process.env.MAILGUN_API_KEY,
            });

            try {
                await mg.messages.create('mg.osiux.ws', {
                    from: 'Osiux.ws Contact Form <no-reply@mg.osiux.ws>',
                    to: ['me@osiux.ws'],
                    subject: 'Osiux.ws Contact Form',
                    'o:tag': 'contact-form',
                    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                });

                response.status(200).json({ message: 'ok' });
            } catch (e) {
                console.log(e.message);
                response.status(400).json({
                    error: 'Error sending message.',
                });
            }
        }
    } else {
        response.status(400).json({
            error: 'Method not supported.',
        });
    }
};
