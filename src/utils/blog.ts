import ImgixClient from '@imgix/js-core';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import calculateReadingTime from 'reading-time';
import { createApi } from 'unsplash-js';


const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
});

const imgix = new ImgixClient({
	domain: 'osiuxws.imgix.net',
	secureURLToken: process.env.IMGIX_SECURE_TOKEN as string,
	useHTTPS: true,
});

type Frontmatter = {
	title: string;
	date: string;
	summary: string;
	image?: string;
	tags: string[];
};

export type Post = {
	slug: string;
	content: string;
	readingTime: string;
} & Frontmatter;

const getMDXFiles = (dir: string) => {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
};

const readMDXFile = (filePath: string) => {
	let rawContent = fs.readFileSync(filePath, 'utf-8');

	const { data, content } = matter(rawContent);

	const readingTime = calculateReadingTime(content).text;

	return { ...data as Frontmatter, content, readingTime };
};

const getMDXData = (dir: string): Post[] => {
	let mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		const data = readMDXFile(path.join(dir, file));
		let slug = path.basename(file, path.extname(file));
		return {
			slug,
			...data,
		};
	});
};

export const getBlogPosts = () => {
	return getMDXData(path.join(process.cwd(), 'content/posts'));
};
