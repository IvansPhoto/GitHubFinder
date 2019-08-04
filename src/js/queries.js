export const querySearchUsers = `
query userFinder($login: String!) {
	search(first: 15, type: USER, query: $login) {
		edges {
			textMatches {
				fragment
				property
			}
		}
		userCount
		pageInfo {
			hasNextPage
			hasPreviousPage
		}
	}
}`;

export const queryProfileUser = `
    query userProfile($login: String!) {
	user(login: $login) {
		name
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
		repositories(first: 50) {
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
}`;