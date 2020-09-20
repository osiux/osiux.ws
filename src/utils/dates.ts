import compareDesc from 'date-fns/compareDesc';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { PostData } from './posts';

export const formatDate = (date: string, dateFormat = 'MMM d, yyyy') =>
    format(parseISO(date), dateFormat);

export const comparePostDates = (a: PostData, b: PostData) => {
    const aDate = parseISO(a.meta.date);
    const bDate = parseISO(b.meta.date);

    return compareDesc(aDate, bDate);
};
