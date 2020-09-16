import fs from 'fs';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'content/posts');

const getPosts = () => {
    const files = fs.readdirSync(POSTS_PATH);
};

export default getPosts;
