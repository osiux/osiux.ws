import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = tw.header`container my-3 font-heading`;
const Nav = tw.nav`flex items-center flex-wrap space-y-6 md:(space-y-0 flex-nowrap)`;
const BrandLink = tw.a`font-bold text-blue-900 text-3xl flex-1`;

const ToggleMenuButton = tw.button`inline-flex p-3 rounded md:hidden ml-auto outline-none transition-colors duration-500 ease-linear focus:outline-none`;

type NavListProps = {
    open: boolean;
};
const NavList = styled.ul(({ open }: NavListProps) => [
    tw`flex items-center justify-center flex-none w-full space-x-2 place-items-center text-xl md:w-auto`,
    open && tw`block`,
    `.current {
        text-decoration: underline;
    }`,
]);
const NavListItem = tw.li`p-2 rounded-lg transition-all duration-500 hover:bg-gray-200`;
const NavLink = tw.a`p-2`;

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
        <Header>
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
                    <NavListItem>
                        <Link href="/blog" passHref>
                            <NavLink>Blog</NavLink>
                        </Link>
                    </NavListItem>
                    <NavListItem>
                        <Link href="/about" passHref>
                            <NavLink>About</NavLink>
                        </Link>
                    </NavListItem>
                    <NavListItem>
                        <Link href="/contact" passHref>
                            <NavLink>Contact</NavLink>
                        </Link>
                    </NavListItem>
                    <NavListItem>
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
                    </NavListItem>
                </NavList>
            </Nav>
        </Header>
    );
};

export default Navigation;
