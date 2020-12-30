// @ts-ignore
import GatsbyRemarkEmbedder from 'gatsby-remark-embedder';

/**
 * TODO: Look into if is possible to cache this on nextjs
 */
const cache = {
    async get() {
        return false;
    },
    async set(key: string, value: string) {
        return true;
    },
};

const embedder = (options = {}) => {
    return async (tree: any) =>
        await GatsbyRemarkEmbedder(
            {
                cache,
                markdownAST: tree,
            },
            options,
        );
};

export default embedder;
