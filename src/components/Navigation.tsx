import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTimes,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

const Nav = tw.nav`flex items-center bg-gray-900 text-gray-100 p-3 flex-wrap border-b border-black h-auto w-full z-10`;
const BrandLink = tw.a`text-xl text-gray-100 font-bold`;
const NavLink = tw.a`w-full px-3 py-2 text-gray-100 items-center justify-center hover:underline md:inline-flex md:w-auto`;

type NavListProps = {
    open: boolean;
};
const NavList = styled.div(({ open }: NavListProps) => [
    tw`hidden w-full md:inline-flex md:flex-grow md:w-auto`,
    open && tw`block`,
    `.current {
        text-decoration: underline;
    }`,
]);
const ToggleMenuButton = tw.button`inline-flex p-3 rounded md:hidden ml-auto outline-none transition-colors duration-500 ease-linear focus:outline-none`;

const LinksContainer = tw.div`w-full items-start flex flex-col md:inline-flex md:flex-row md:ml-auto md:w-auto md:items-center md:h-auto`;

const Form = tw.form`relative mx-auto text-gray-600`;

const SearchInput = tw.input`border-2 border-gray-300 bg-gray-200 h-10 px-3 pr-8 rounded text-sm focus:outline-none`;
const SearchButton = tw.button`absolute right-0 top-0 mt-2 mr-2`;

const Navigation = () => {
    const router = useRouter();
    const [query, setQuery] = useState((router?.query?.q as string) || '');
    const [menuOpen, setMenuOpen] = useState(false);

    const _toggleMenu = () => setMenuOpen((prev) => !prev);

    const _searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchTerm = query.trim();

        if (searchTerm.length > 0) {
            router.push(`/search?q=${query}`);
        }
    };

    return (
        <Nav id="header">
            <Link href="/" passHref>
                <BrandLink>Eduardo Reveles</BrandLink>
            </Link>
            <ToggleMenuButton
                role="button"
                aria-label="Toggle Menu"
                onClick={_toggleMenu}
            >
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </ToggleMenuButton>
            <NavList open={menuOpen}>
                <LinksContainer>
                    <Link href="/blog" passHref>
                        <NavLink>Blog</NavLink>
                    </Link>
                    <Link href="/about" passHref>
                        <NavLink>About</NavLink>
                    </Link>
                    <Link href="/contact" passHref>
                        <NavLink>Contact</NavLink>
                    </Link>
                    <Form tw="hidden" onSubmit={_searchSubmit}>
                        <SearchInput
                            type="search"
                            name="q"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <SearchButton>
                            <FontAwesomeIcon icon={faSearch} />
                        </SearchButton>
                    </Form>
                </LinksContainer>
            </NavList>
        </Nav>
    );
};

export default Navigation;
