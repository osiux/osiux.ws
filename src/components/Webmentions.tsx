import { useState, useMemo, useCallback } from 'react';
import tw, { styled } from 'twin.macro';
import parseISO from 'date-fns/parseISO';
import formatISO9075 from 'date-fns/formatISO9075';
import { useInView } from 'react-intersection-observer';

import Circles from '@app/components/loaders/Circles';
import Bars from '@app/components/loaders/Bars';
import {
	useWebMentionsCount,
	useWebmentions,
	PER_PAGE,
} from '@app/hooks/webmentions';

const MentionsContainer = tw.section``;
const MentionItem = styled.li`
	${tw`flex mb-3 items-center bg-gray-100 shadow-md odd:bg-gray-200 rounded-md dark:(bg-gray-600 odd:bg-gray-700)`};

	a {
		${tw`dark:text-gray-100`}
	}
`;
const MentionAuthorImage = tw.img`w-20 md:w-32 max-w-max mr-3 rounded-l-md`;
const MentionContent = styled.p`
	${tw`prose md:prose-xl max-w-full! flex flex-col dark:text-gray-100`}

	a {
		${tw`dark:text-gray-100`}
	}
`;
const Separator = tw.span`inline mx-1`;
const Pagination = tw.nav`flex justify-end mt-10`;
const PageButton = tw.button`mx-2 border bg-gray-700 text-gray-100 p-3 disabled:opacity-50`;

const Webmentions = ({ slug }: { slug: string }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	});
	const [page, setPage] = useState(0);
	const {
		data: mentions,
		isLoading,
		isFetching,
	} = useWebmentions(slug, page, inView);
	const { data: count } = useWebMentionsCount(slug, inView);

	const totalPages = useMemo(() => {
		if (count?.type) {
			const mentions = count.type.mention ?? 0;
			return Math.ceil(mentions / PER_PAGE);
		}
		return 0;
	}, [count]);

	const goBack = useCallback(() => {
		if (page === 0) return;

		setPage((p) => p - 1);
	}, [page]);

	const goForward = useCallback(() => {
		if (page === totalPages - 1) return;

		setPage((p) => p + 1);
	}, [page, totalPages]);

	return (
		<MentionsContainer id="webmentions" ref={ref}>
			<h3 tw="text-3xl">Discussion:</h3>
			{isLoading ? (
				<Circles />
			) : (
				<>
					<div tw="flex justify-between">
						<p>Likes: {count?.type.like ?? 0}</p>

						{isFetching && (
							<div tw="flex justify-end">
								<Bars width={50} height={20} />
							</div>
						)}
					</div>

					<ul tw="list-none m-0 p-0">
						{mentions?.map((mention) => {
							const date = parseISO(mention.published);

							return (
								<MentionItem key={mention['wm-id']}>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href={mention.author.url}
									>
										<MentionAuthorImage
											src={mention.author.photo}
											alt={mention.author.name}
										/>
									</a>
									<MentionContent>
										<span
											dangerouslySetInnerHTML={{
												__html: mention.content.html,
											}}
										/>
										<br />
										<span>
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={mention.author.url}
											>
												{mention.author.name}
											</a>
											<Separator>&middot;</Separator>
											<abbr title={mention.published}>
												{formatISO9075(date)}
											</abbr>
											<Separator>&middot;</Separator>
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={mention.url}
												title="Permalink"
											>
												#
											</a>
										</span>
									</MentionContent>
								</MentionItem>
							);
						})}
					</ul>

					{totalPages > 1 && (
						<Pagination>
							<PageButton disabled={page === 0} onClick={goBack}>
								⇽ Previous Page
							</PageButton>
							<PageButton
								disabled={page === totalPages - 1}
								onClick={goForward}
							>
								Next Page ⇾
							</PageButton>
						</Pagination>
					)}
				</>
			)}
		</MentionsContainer>
	);
};

export default Webmentions;
