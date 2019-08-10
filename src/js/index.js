import {GraphQLClient} from 'graphql-request'
import {queryProfileUser} from './queries'
import {querySearchUsers} from './queries'
import {createNewUser} from './createNewUser'

const endpoint = 'https://api.github.com/graphql'
const headerAdding = document.querySelector('header span')
const header = document.querySelector('header')

// Getting an access key from LS.
let access = localStorage.getItem('access')
checkAK()

// Checking LS for presence of an access key.
function checkAK() {
	if (access === null || undefined || ``) {
		console.log('Insert an access key for access search!')
		headerAdding.innerText = `The access key not found.`
		headerAdding.classList.add('red')
		header.classList.add('gray')
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
	e.preventDefault()
})

// A GraphQl request function.
async function GitHubGraphQL(query, variables) {
	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {authorization: `bearer ${access}`},
	})
	return await graphQLClient.request(query, variables)
}


// Getting part of a user login for searching a user.
document.getElementById('Form-UserSearcher').addEventListener('submit', e => {
	const login = document.getElementById('UserSearcher').value
	let variables = {login: `${login}`}
	GitHubGraphQL(querySearchUsers, variables)
		.then(data => userSearch(data.search))
		.catch(error => console.error(error))
	e.preventDefault()
})
function userSearch(data) {
	// let loginMatches = data.edges.filter(item => {
	// 	return item.textMatches.forEach(subItem => {
	// 		subItem.filter(subSubItem => {
	// 			return subSubItem.property === 'login'
	// 		})
	// 	})
	//
	// })

	data.edges.forEach(item => {
		item.textMatches.forEach(subItem => {
			if (subItem.property === 'login') {
				console.log(subItem)
				let variables = {login: `${subItem.fragment}`}
				GitHubGraphQL(queryProfileUser, variables)
					.then(data => createNewUser(data.user))
					.catch(error => console.error(error))
			}
		})
	})

	// console.log(data.edges)
	// console.log(data.edges[0].textMatches[0].property)
	// console.log(loginMatches)

	// let searchResult = document.createElement('div')
	// searchResult.classList.add('searchResult')
	// searchResult.innerText = `${data.edges}`
	// insertDiv(searchResult)
}


// Getting a user login to find the user.
document.getElementById('Form-UserByLogin').addEventListener('submit', e => {
	const login = document.getElementById('UserByLogin').value
	let variables = {login: `${login}`}
	GitHubGraphQL(queryProfileUser, variables)
		.then(data => createNewUser(data.user))
		.catch(error => console.error(error))
	e.preventDefault()
})

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

