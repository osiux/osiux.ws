/**
 * https://tobiasahlin.com/spinkit/
 */
import tw, { styled } from 'twin.macro';

const BarsContainer = styled.div<{ width: number; height: number }>`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	text-align: center;
	font-size: 10px;

	& > div {
		${tw`bg-gray-600 dark:bg-gray-100`}
		height: 100%;
		width: 20%;
		display: inline-block;
		animation: sk-stretchdelay 1.2s infinite ease-in-out;
	}

	.rect2 {
		animation-delay: -1.1s;
	}
	.rect3 {
		animation-delay: -1s;
	}
	.rect4 {
		animation-delay: -0.9s;
	}
	.rect5 {
		animation-delay: -0.8s;
	}

	@keyframes sk-stretchdelay {
		0%,
		40%,
		100% {
			transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1);
		}
	}
`;

const Bars = ({ width = 100, height = 50 }) => (
	<BarsContainer width={width} height={height}>
		<div className="rect1"></div>
		<div className="rect2"></div>
		<div className="rect3"></div>
		<div className="rect4"></div>
		<div className="rect5"></div>
	</BarsContainer>
);

export default Bars;
