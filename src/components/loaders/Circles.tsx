/**
 * https://tobiasahlin.com/spinkit/
 */
import tw, { styled } from 'twin.macro';

const CirclesContainer = styled.div<{ width: number; height: number }>`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	position: relative;
	animation: sk-chase 2.5s infinite linear both;
	${tw`mt-4 mx-auto`}

	& > div {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		animation: sk-chase-dot 2s infinite ease-in-out both;

		&:before {
			content: '';
			display: block;
			width: 25%;
			height: 25%;
			${tw`bg-gray-600 dark:bg-gray-100`}
			border-radius: 100%;
			animation: sk-chase-dot-before 2s infinite ease-in-out both;
		}
	}

	&:nth-child(1) {
		animation-delay: -1.1s;
		&:before {
			animation-delay: -1.1s;
		}
	}
	&:nth-child(2) {
		animation-delay: -1s;
		&:before {
			animation-delay: -1s;
		}
	}
	&:nth-child(3) {
		animation-delay: -0.9s;
		&:before {
			animation-delay: -0.9s;
		}
	}
	&:nth-child(4) {
		animation-delay: -0.8s;
		&:before {
			animation-delay: -0.8s;
		}
	}
	&:nth-child(5) {
		animation-delay: -0.7s;
		&:before {
			animation-delay: -0.7s;
		}
	}
	&:nth-child(6) {
		animation-delay: -0.6s;
		&:before {
			animation-delay: -0.6s;
		}
	}

	@keyframes sk-chase {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes sk-chase-dot {
		80%,
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes sk-chase-dot-before {
		50% {
			transform: scale(0.4);
		}
		100%,
		0% {
			transform: scale(1);
		}
	}
`;

const Circles = ({ width = 100, height = 100 }) => (
	<CirclesContainer width={width} height={height}>
		<div className="sk-chase-dot"></div>
		<div className="sk-chase-dot"></div>
		<div className="sk-chase-dot"></div>
		<div className="sk-chase-dot"></div>
		<div className="sk-chase-dot"></div>
		<div className="sk-chase-dot"></div>
	</CirclesContainer>
);

export default Circles;
