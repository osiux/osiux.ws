import { compareDesc, format, parseISO } from 'date-fns';

import { Post } from '@app/utils/blog';

export const formatDate = (date: string, dateFormat = 'MMM d, yyyy') =>
	format(parseISO(date), dateFormat);

export const comparePostDates = (a: Post, b: Post) => {
	const aDate = parseISO(a.date);
	const bDate = parseISO(b.date);

	return compareDesc(aDate, bDate);
};
