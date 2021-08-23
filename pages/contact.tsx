import React, { useState } from 'react';
import ky from 'ky';
import tw, { styled, css } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faLinkedin,
    faStackOverflow,
    faTwitter,
    faInstagram,
    faLastfm,
} from '@fortawesome/free-brands-svg-icons';
import { NextSeo } from 'next-seo';

const SocialNetworksList = tw.ul`list-none flex justify-center m-0 text-3xl`;

const SocialNetworkItem = styled.li`
    ${tw`pl-3!`}
    &::before {
        ${tw`hidden!`}
    }
`;

const Form = tw.form`flex w-full flex-col md:w-4/5 mx-auto`;
const Field = tw.div`flex justify-end mb-4 flex-col md:flex-row md:flex-wrap`;
const Label = tw.label`w-full mb-2 md:w-1/4 md:mt-1`;

const baseInput = css`
    ${tw`w-full p-2 border border-gray-800 border-solid md:w-3/4`}
`;

const Input = styled.input`
    ${baseInput}
`;

const TextArea = styled.textarea`
    ${baseInput}
`;

const Button = styled.button`
    ${tw`border border-solid border-gray-800 outline-none py-3 px-5 w-full self-end md:w-auto md:py-3 md:px-10`}

    &[disabled] {
        ${tw`bg-gray-600 opacity-50 border-0`}
    }
`;

const baseMessage = css`
    ${tw`w-full text-center mx-auto mb-2 p-2 border border-dotted md:w-4/5`}
`;

const Success = styled.p`
    ${baseMessage}
    color: #4f8a10;
    background: #dff2bf;
    border: 1px solid #86bf27;
`;

const Error = styled.p`
    ${baseMessage}
    color: #d8000c;
    background: #ffd2d2;
    border: 1px solid #800007;
`;

const Section = tw.section`prose prose-xl max-w-full!`;

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<boolean | string>(false);
    const [success, setSuccess] = useState(false);

    const _onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const formData = new URLSearchParams();
            formData.set('name', name);
            formData.set('email', email);
            formData.set('url', url);
            formData.set('message', message);

            const response = await ky.post('/api/contact', { body: formData });

            if (!response.ok) {
                setError(
                    'Error sending the form, please try again or send me an email.',
                );
            } else {
                setSuccess(true);
                setName('');
                setEmail('');
                setUrl('');
                setMessage('');
            }
        } catch (e) {
            setError(
                'Error sending the form, please try again or send me an email.',
            );
        }

        setIsSubmitting(false);
    };

    return (
        <Section>
            <NextSeo title="Contact" />
            <p>
                If you want to get in touch with me feel free to email me at{' '}
                <a href="me@osiux.ws?subject=Hello!">me@osiux.ws</a>, send me a
                message in any of my social networks, or you can use the contact
                form below.
            </p>
            <SocialNetworksList>
                <SocialNetworkItem>
                    <a href="https://github.com/osiux" title="Github">
                        <FontAwesomeIcon icon={faGithub} fixedWidth />
                    </a>
                </SocialNetworkItem>
                <SocialNetworkItem>
                    <a
                        href="https://www.linkedin.com/in/ereveles/"
                        title="Linkedin"
                    >
                        <FontAwesomeIcon icon={faLinkedin} fixedWidth />
                    </a>
                </SocialNetworkItem>
                <SocialNetworkItem>
                    <a
                        href="https://stackoverflow.com/users/717643/eduardo-reveles"
                        title="Stack Overflow"
                    >
                        <FontAwesomeIcon icon={faStackOverflow} fixedWidth />
                    </a>
                </SocialNetworkItem>
                <SocialNetworkItem>
                    <a href="https://twitter.com/osiux" title="Twitter">
                        <FontAwesomeIcon icon={faTwitter} fixedWidth />
                    </a>
                </SocialNetworkItem>
                <SocialNetworkItem>
                    <a
                        href="https://www.instagram.com/oso96_2000/"
                        title="Instagram"
                    >
                        <FontAwesomeIcon icon={faInstagram} fixedWidth />
                    </a>
                </SocialNetworkItem>
                <SocialNetworkItem>
                    <a
                        href="https://www.last.fm/user/oso96_2000"
                        title="Last.fm"
                    >
                        <FontAwesomeIcon icon={faLastfm} fixedWidth />
                    </a>
                </SocialNetworkItem>
            </SocialNetworksList>

            {success && <Success>Thanks! I&apos;ll be in touch shortly!</Success>}
            {error && <Error>{error}</Error>}

            <Form
                name="Contact"
                onSubmit={_onSubmit}
            >
                <input type="hidden" name="form-name" value="Contact" />
                <Field>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Field>

                <Field>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Field>

                <Field tw="hidden">
                    <Label htmlFor="url">Url:</Label>
                    <Input
                        type="url"
                        name="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </Field>

                <Field>
                    <Label htmlFor="message">Message:</Label>
                    <TextArea
                        name="message"
                        id="message"
                        rows={10}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                    />
                </Field>

                <Field>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </Button>
                </Field>
            </Form>
        </Section>
    );
};

export default Contact;
