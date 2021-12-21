import tw, { styled } from 'twin.macro';
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
import Image from 'next/image';

import Layout from '@app/components/Layout';

import GetInTouch from '@images/get-in-touch.svg'

const SocialNetworksList = tw.ul`list-none flex justify-center m-0 text-3xl`;

const SocialNetworkItem = styled.li`
	${tw`pl-3!`}
	&::before {
		${tw`hidden!`}
	}
`;

const Section = styled.section`
	${tw`prose md:prose-xl flex transition-colors duration-300 max-w-full! dark:text-gray-100`}

	a {
		${tw`transition-colors duration-300 dark:text-gray-100`}
	}
`;

const Contact = () => (
	<Layout>
		<Section>
			<NextSeo title="Contact" />
			<div tw="flex items-center flex-col">
				<p>
					If you want to get in touch with me feel free to email me at{' '}
					<a href="me@osiux.ws?subject=Hello!">me@osiux.ws</a> or send
					me a message in any of my social networks.
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
							<FontAwesomeIcon
								icon={faStackOverflow}
								fixedWidth
							/>
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
			</div>
			<div tw="text-center">
				<Image src={GetInTouch} alt="Get in touch" />
				<a tw="text-xs" href="https://storyset.com/online">Online illustrations by Storyset</a>
			</div>
		</Section>
	</Layout>
);

export default Contact;
