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

const Header = tw.header`w-full font-heading bg-gray-50 transition-colors duration-300 dark:bg-gray-800`;
const Nav = tw.nav`max-w-3xl mx-auto w-full  flex items-center flex-wrap md:(max-w-4xl flex-nowrap) mt-8 mb-8 md:mt-8`;
const BrandLink = tw(Link)`font-bold text-gray-800 text-3xl flex-1 transition-colors duration-300 dark:text-gray-100 ml-2 md:ml-0`;

const ToggleMenuButton = tw.button`inline-flex p-3 rounded md:hidden ml-auto outline-none focus:outline-none`;
const DarkModeButton = tw.button`bg-transparent inline-flex p-3 ml-auto outline-none focus:outline-none md:order-3`;

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
const NavLink = tw(Link)`px-4 py-2 rounded-lg transition-colors duration-300 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-500`;

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
			<Nav>
				<BrandLink href="/">
					Eduardo Reveles
				</BrandLink>
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
				<NavList
					// variants={navVariants}
					// animate={menuOpen ? 'open' : 'closed'}
					open={menuOpen}
				>
					<NavListItem>
						<NavLink href="/blog" passHref legacyBehavior>
							Blog
						</NavLink>
					</NavListItem>
					<NavListItem>
						<NavLink href="/about" passHref legacyBehavior>
							About
						</NavLink>
					</NavListItem>
					<NavListItem>
						<NavLink href="/contact" passHref legacyBehavior>
							Contact
						</NavLink>
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
