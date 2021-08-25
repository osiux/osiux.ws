import React from 'react';
import tw from 'twin.macro';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

const Section = tw.section`prose prose-xl max-w-full!`;

const Uses = () => (
	<Section>
		<NextSeo title="About: Uses" />
		<h1>Uses</h1>
		<p>
			Inspired by <a href="https://wesbos.com/uses/">Wes Bos</a>, here is
			a list of hardware and software I use.
		</p>
		<h2>Hardware</h2>
		<ul>
			<li>
				Lenovo T450s running{' '}
				<a href="https://www.archlinux.org/">ArchLinux</a> for personal
				usage.
			</li>
			<li>
				Custom built PC with two monitors, dual boot Windows 10/
				<a href="https://www.archlinux.org/">ArchLinux</a> that I use
				for gaming and work.
			</li>
			<li>Macbook Pro 13&quot; with M1 processor for work.</li>
		</ul>
		<h2>Software</h2>
		<ul>
			<li>
				<a href="https://code.visualstudio.com/">VSCode</a>
			</li>
			<li>
				<a href="https://code.launchpad.net/terminator">Terminator</a>
			</li>
			<li>
				<a href="https://www.mozilla.org/en-US/firefox/developer/">
					Firefox Developer Edition
				</a>
			</li>
			<li>
				<a href="https://www.zsh.org/">ZSH</a> and{' '}
				<a href="https://github.com/sorin-ionescu/prezto">Prezto</a>
			</li>
			<li>
				<a href="https://bitwarden.com/">Bitwarden</a>
			</li>
		</ul>
		<p>
			<Link href="/about">
				<a>← Back to About</a>
			</Link>
		</p>
	</Section>
);

export default Uses;
