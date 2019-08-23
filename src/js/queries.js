export const querySearchUsersPagination = (login, before, after, previousPage = 'false', nextPage = 'false') => {

	let q = `
	query userFinder {
		search(first: 30, type: USER, query: "${login}") {
			edges {
				textMatches {
					fragment
					property
				}
			}
			userCount
			pageInfo {
				startCursor
	            endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}`

	let qPreviousPage = `
	query userFinder {
		search(last: 30, type: USER, query: "${login}", before: "${before}") {
			edges {
				textMatches {
					fragment
					property
				}
			}
			userCount
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}`

	let qNextPage = `
	query userFinder {
		search(first: 30, type: USER, query: "${login}", after: "${after}") {
			edges {
				textMatches {
					fragment
					property
				}
			}
			userCount
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}`


	if (previousPage && nextPage) return q
	else {
		if (previousPage) return qPreviousPage
		if (nextPage) return qNextPage
	}
}

export const queryProfileUser = (login) => `
query userProfile {
	user(login: ${login}) 
	{
		name
		login
		url
		email
		company
		createdAt
		location
		avatarUrl
		websiteUrl
		id
		isEmployee
		isHireable
		isDeveloperProgramMember
		repositories(first: 100) {
			totalCount
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			nodes {
				name
				createdAt
				url
			}
		}
		gists {
			totalCount
		}
		followers {
			totalCount
		}
		following {
			totalCount
		}
	}
}`

export const queryShortProfileUser = `
query userProfile($login: String!) 
{
	user(login: $login) 
	{
		url
		login
		name
		company
		location
		avatarUrl
		websiteUrl
	}
}`