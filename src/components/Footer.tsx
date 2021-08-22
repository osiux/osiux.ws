import tw, { css } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
    <footer>
        <p tw="text-center text-sm">
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
            <a href="https://nextjs.org/">NextJS</a>.{' '}
            <a
                href="https://github.com/osiux/osiux.ws"
                title="Github Repository"
            >
                <FontAwesomeIcon icon={faGithub} fixedWidth />
            </a>
        </p>
    </footer>
);

export default Footer;
