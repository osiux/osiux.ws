import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBars,
	faTimes,
	faSearch,
	faSun,
	faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const Header = tw.header`container my-3 font-heading bg-gray-50 h-auto border-b border-gray-600 border-dotted flex justify-between items-start sticky z-50 top-0 flex-col md:(h-24 flex-row items-center)`;
const Nav = tw.nav`flex items-center flex-wrap md:(flex-nowrap)`;
const BrandLink = tw.a`font-bold text-gray-800 text-3xl flex-1 transition-all duration-500 dark:text-gray-100`;

const ToggleMenuButton = tw.button`inline-flex p-3 rounded md:hidden ml-auto outline-none focus:outline-none`;
const DarkModeButton = tw.button`bg-transparent inline-flex p-3 ml-auto outline-none md:order-3`;

type NavListProps = {
	open: boolean;
};
const NavList = styled(motion.ul)(({ open }: NavListProps) => [
	tw`hidden flex-col items-center justify-center flex-none w-full place-items-center text-xl md:(flex flex-row w-auto)`,
	open && tw`flex`,
	`.current {
        text-decoration: underline;
    }`,
]);
const NavListItem = tw.li`ml-2 my-3 md:my-0`;
const NavLink = tw.a`px-4 py-2 rounded-lg transition-all duration-500 hover:bg-gray-200 dark:hover:bg-gray-500`;

const Form = tw.form`relative mx-auto text-gray-600`;

const SearchInput = tw.input`border-2 border-gray-300 bg-gray-200 h-10 px-3 pr-8 rounded text-sm focus:outline-none`;
const SearchButton = tw.button`absolute right-0 top-0 mt-2 mr-2`;

const navVariants = {
	open: {
		display: 'flex',
		opacity: 1,
		height: 'auto',
	},
	closed: {
		opacity: 0,
		height: 0,
		transitionEnd: { display: 'none' },
	},
};

const Navigation = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const [query, setQuery] = useState((router?.query?.q as string) || '');
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const toggleMenu = () => setMenuOpen((prev) => !prev);

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const searchTerm = query.trim();

		if (searchTerm.length > 0) {
			router.push(`/search?q=${query}`);
		}
	};

	return (
		<Header>
			<Link href="/" passHref>
				<BrandLink>Eduardo Reveles</BrandLink>
			</Link>
			<div>
				<DarkModeButton
					role="button"
					aria-label="Toggle Dark Mode"
					onClick={toggleTheme}
				>
					<FontAwesomeIcon
						fixedWidth
						size="lg"
						icon={theme === 'dark' ? faSun : faMoon}
					/>
				</DarkModeButton>
				<ToggleMenuButton
					role="button"
					aria-label="Toggle Menu"
					onClick={toggleMenu}
				>
					<FontAwesomeIcon
						size="lg"
						fixedWidth
						icon={menuOpen ? faTimes : faBars}
					/>
				</ToggleMenuButton>
			</div>
			<Nav>
				<NavList
					// variants={navVariants}
					// animate={menuOpen ? 'open' : 'closed'}
					open={menuOpen}
				>
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
					<NavListItem tw="hidden">
						<Form onSubmit={searchSubmit}>
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
