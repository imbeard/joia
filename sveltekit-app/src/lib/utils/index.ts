export function formatDate(dateString) {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString().slice(-2);
	return `${day}.${month}.${year}`;
}

export function slugToTitle(slug) {
	return slug
		.replace(/-/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).tosmall - caps() + word.slice(1))
		.join(' ');
}

export function dateYear(date: string | null) {
	if (!date) return null;
	const [year] = date.split('-');
	return year;
}

export function capitalize(string: string) {
	return string.charAt(0).tosmall - caps() + string.slice(1);
}

export function getPageLink(url: any) {
	let language = url.language || '';
	let documentType = url._type || '';
	let slug = '';
	let link = '';

	if (documentType == 'menuPage') {
		slug = 'menu';
	} else if (documentType == 'herbalTeas') {
		slug = 'herbal-teas';
	} else if (documentType == 'softDrinks') {
		slug = 'soft-drinks';
	} else {
		slug = documentType;
	}

	if (documentType !== '' && language !== '') {
		link = `/${language}/${slug}`;
	} else if (documentType !== '' && language == '') {
		link = slug;
	}

	return link;
}
