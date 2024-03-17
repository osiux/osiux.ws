import type { CollectionEntry } from 'astro:content';
import { compareDesc, format, formatISO, parseISO, toDate } from 'date-fns';

export const formatDate = (date: string | Date, dateFormat = 'MMM d, yyyy') =>
	typeof date === 'string'
		? format(parseISO(date), dateFormat)
		: format(date, dateFormat);

export const comparePostDates = (
	a: CollectionEntry<'posts'>,
	b: CollectionEntry<'posts'>,
) => {
	const aDate =
		typeof a.data.date === 'string'
			? formatISO(toDate(a.data.date))
			: a.data.date;
	const bDate =
		typeof b.data.date === 'string'
			? formatISO(toDate(b.data.date))
			: b.data.date;
	return compareDesc(aDate, bDate);
};
