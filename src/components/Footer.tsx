import React, { useContext } from 'react';
import tw, { styled, css } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const FooterComponent = tw.footer`text-gray-900 pt-5 pb-1 px-4 text-center transition-colors duration-500 ease-linear prose max-w-none`;

const StyledLink = tw.a`transition-colors duration-500 ease-linear`;

const Footer = () => (
    <FooterComponent>
        <p>
            © {new Date().getFullYear()}, Made with{' '}
            <span
                role="img"
                aria-label="heart"
                css={css`
                    ${tw`text-red-600`}
                `}
            >
                ❤️
            </span>{' '}
            , cats and{' '}
            <StyledLink href="https://nextjs.org/">NextJS</StyledLink>.{' '}
            <StyledLink
                href="https://github.com/osiux/osiux.ws"
                title="Github Repository"
            >
                <FontAwesomeIcon icon={faGithub} fixedWidth />
            </StyledLink>
        </p>
    </FooterComponent>
);

export default Footer;
