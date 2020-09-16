import fs from 'fs';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'content/posts');

const getPosts = () => {
    return fs.readdirSync(POSTS_PATH).map((file) => ({
        slug: file.replace('.mdx', ''),
        path: path.join(POSTS_PATH, file),
    }));
};

export default getPosts;
