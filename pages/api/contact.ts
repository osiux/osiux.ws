import AbortController from 'node-abort-controller';
// @ts-ignore
global.AbortController = AbortController;
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { VercelRequest, VercelResponse } from '@vercel/node';

type MessageBody = {
    name: string;
    email: string;
    url: string;
    message: string;
};

const contact = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === 'POST') {
        const { name, email, url, message }: MessageBody = request.body;

        if (url.trim().length > 0) {
            // try to avoid spam bots
            response.status(200).json({ message: 'ok' });
        } else {
            // @ts-ignore
            const mailgun = new Mailgun(FormData);
            const mg = mailgun.client({
                username: 'api',
                key: process.env.MAILGUN_API_KEY as string,
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

export default contact;
