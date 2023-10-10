export function formatYear(year: string): string {
	const yearRegex = /\b(\d{4})\b/g
	const matches = year.match(yearRegex)

	if (matches && matches.length > 0) {
		// If there are one or more 4-digit year matches, join them with '-'.
		return matches.join('-')
	} else {
		// If there are no 4-digit year matches, return the input as is.
		return year
	}
}
