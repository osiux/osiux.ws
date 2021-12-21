import compareDesc from 'date-fns/compareDesc';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import type { Post } from '.contentlayer/types'

export const formatDate = (date: string, dateFormat = 'MMM d, yyyy') =>
	format(parseISO(date), dateFormat);

export const comparePostDates = (a: Post, b: Post) => {
	const aDate = parseISO(a.date);
	const bDate = parseISO(b.date);

	return compareDesc(aDate, bDate);
};
