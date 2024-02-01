import { Post } from '@app/utils/blog';
import { compareDesc, format, parseISO } from 'date-fns';

export const formatDate = (date: string, dateFormat = 'MMM d, yyyy') =>
	format(parseISO(date), dateFormat);

export const comparePostDates = (a: Post, b: Post) => {
	return compareDesc(a.date, b.date);
};
