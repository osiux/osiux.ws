import tw, { css } from 'twin.macro';

const tags = css`
	.tag {
		${tw`bg-gray-300 text-gray-800 hover:bg-gray-400`}
	}

	.tag-gatsbyjs {
		${tw`bg-purple-700 text-white hover:bg-purple-900`}
	}

	.tag-development {
		${tw`bg-green-600 text-white hover:bg-green-800`}
	}

	.tag-travel {
		${tw`bg-yellow-500 hover:(bg-yellow-600 text-white)`}
	}

	.tag-fontawesome {
		${tw`bg-blue-900 text-white hover:bg-blue-700`}
	}

	.tag-video {
		${tw`bg-red-500 text-white hover:bg-red-600`}
	}
`;

export default tags;
