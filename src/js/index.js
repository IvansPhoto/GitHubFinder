import {GraphQLClient} from 'graphql-request'
import {queryProfileUser} from './queries'
import {createNewUser} from './createNewUser'
import {queryShortProfileUser} from './queries'
import {querySearchUsersPagination} from './queries'

//Const for messages on the top of the page.
const headerAdding = document.querySelector('header span')
const header = document.querySelector('header')

const endpoint = 'https://api.github.com/graphql'
// Getting an access key from LS.
let access = localStorage.getItem('access')
checkAK()

// Checking LS for presence of an access key.
function checkAK() {
	if (access === null || undefined || ``) {
		headerAdding.innerText = `The access key not found.`
		headerAdding.classList.add('red')
		header.classList.add('gray')
		console.log('Insert an access key for access search!')
	} else {
		headerAdding.classList.remove('red')
		header.classList.remove('gray')
		headerAdding.innerText = `The access key is loaded.`
		console.log('The access key has been loaded successfully.')
	}
}

// Input an access key.
document.getElementById('Form-AccessKey').addEventListener('submit', e => {
	access = document.getElementById('AccessKey').value
	localStorage.setItem('access', `${access}`)
	checkAK()
	document.getElementById('Form-AccessKey').reset()
	e.preventDefault()
})

// A GraphQl request function.
async function GitHubGraphQL(query, variables) {
	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {authorization: `bearer ${access}`},
	})
	return await graphQLClient.request(query, variables)
}

let endCursor
let startCursor
let hasNextPage = false
let hasPreviousPage = false
let login
let ResultList = document.getElementById('ResultList')
const nextPage = document.getElementById('nextPage')
const previousPage = document.getElementById('previousPage')

function clearListResult(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild)
	}
} // Clear the list from previous search


function transferParams(params) {
	if (params.hasNextPage) nextPage.style.visibility = 'visible'
	else nextPage.style.visibility = 'hidden'
	if (params.hasPreviousPage) previousPage.style.visibility = 'visible'
	else previousPage.style.visibility = 'hidden'
	endCursor = params.endCursor
	startCursor = params.startCursor
	hasNextPage = params.hasNextPage
	hasPreviousPage = params.hasPreviousPage

	console.log(params)
}

// Getting part of a user login for searching a user.
document.getElementById('Form-UserSearcher').addEventListener('submit', function mainSearch(e) {
	clearListResult(ResultList)

	login = document.getElementById('UserSearcher').value //Input a login
	GitHubGraphQL(querySearchUsersPagination(login))
		.then(data => {
			transferParams(data.search.pageInfo)
			userSearch(data.search)
		})
		.catch(error => console.error(error))


	// document.getElementById('Form-UserSearcher').reset()	//Making clear the input field after inputted a login
	e.preventDefault()
})

nextPage.addEventListener('click', e => {
	clearListResult(ResultList)

	console.log(endCursor, startCursor, hasPreviousPage, hasNextPage)

	GitHubGraphQL(querySearchUsersPagination(login, startCursor, endCursor, false, true))
		.then(data => {
			transferParams(data.search.pageInfo)
			userSearch(data.search)
		})
		.catch(error => console.error(error))
	e.preventDefault()
})

previousPage.addEventListener('click', e => {
	clearListResult(ResultList)

	console.log(endCursor, startCursor, hasPreviousPage, hasNextPage)

	GitHubGraphQL(querySearchUsersPagination(login, startCursor, endCursor, true, false))
		.then(data => {
			transferParams(data.search.pageInfo)
			userSearch(data.search)
		})
		.catch(error => console.error(error))
	e.preventDefault()
})


function userSearch(dataSearch) {
	dataSearch.edges.forEach(item => {
		item.textMatches.forEach(subItem => {
			if (subItem.property === 'login') {
				let variables = {login: `${subItem.fragment}`}
				GitHubGraphQL(queryShortProfileUser, variables)
					.then(userShortProfile => createListOfUser(userShortProfile.user))
					.catch(error => console.error(error))
			}
		})
	})
}

function createListOfUser(userData) {
	// Create new div.userProfile
	let profile = document.createElement('div')
	profile.classList.add('userProfile')
	profile.innerHTML =
		`
		<div class="photo" style="background-image: url(${userData.avatarUrl})"></div>
		<div class="record color-gray1">
			<div class="openProfile">Open profile</span></div>
			<!--<div class="openInTab">Open in a tab</div>-->
			<div class="remove">Remove the record</span></div>
		</div>
		<div class="userInfo color-gray1">Name: <span>${userData.name}</span> Login: <span>${userData.login}</span></div>
		<div class="userInfo color-gray1">Company: <span>${userData.company === null && 'undefined' ? userData.company = `No company` : userData.company}</span></div>
		<div class="userInfo color-gray1">Web-Site: <a target="_blank" href="${userData.websiteUrl}"><span>${userData.websiteUrl}</span></a></div>
		<div class="userInfo color-gray1">Location: <span>${userData.location}</span></div>
		<div class="userInfo color-gray1"><a target="_blank" href="${userData.url}">View <span>${userData.login}</span> profile on GitHub</a></div>
		`
	profile.addEventListener('click', function (e) {
		if (e.target.classList.contains('remove')) {
			this.remove()
			// e.target.parentElement.parentElement.remove()
		}
		if (e.target.classList.contains('openProfile')) createTheUserProfile(userData.login)
	})
	document.getElementById('ResultList').appendChild(profile)

}

function createTheUserProfile(login) {
	GitHubGraphQL(queryProfileUser(login))
		.then(data => createNewUser(data.user))
		.catch(console.log)
}

// Make a tab active.
let tabs = document.querySelectorAll('.tab')
let bigDivs = document.querySelectorAll('.bigDiv')
// Switching tabs and forms
tabs.forEach(Element => {
	Element.addEventListener('click', function () {
		tabs.forEach(element => element.classList.remove('active'))
		bigDivs.forEach(element => element.classList.remove('active'))

		this.classList.add('active')

		bigDivs.forEach(Element => {
			if (Element.id.replace(/^([\W\w]{5})/i, '') === this.id.replace(/^([\W\w]{5})/i, '')) Element.classList.add('active')
		})
	})
})

