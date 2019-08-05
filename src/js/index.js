import {GraphQLClient} from 'graphql-request'
import {queryProfileUser} from './queries'
import {querySearchUsers} from './queries'

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

// Getting a user login to find the user.
document.getElementById('Form-UserByLogin').addEventListener('submit', e => {
	const login = document.getElementById('UserByLogin').value
	let variables = {login: `${login}`}
	GitHubGraphQL(queryProfileUser, variables)
		.then(data => console.log(JSON.stringify(data, undefined, 2)))
		.catch(error => console.error(error))
	e.preventDefault()
})

// Getting part of a user login for searching a user.
document.getElementById('Form-UserSearcher').addEventListener('submit', e => {
	const login = document.getElementById('UserSearcher').value
	let variables = {login: `${login}`}
	GitHubGraphQL(querySearchUsers, variables)
		.then(data => console.log(JSON.stringify(data, undefined, 2)))
		.catch(error => console.error(error))
	e.preventDefault()
})

// Make a tab active.
let tabs = document.querySelectorAll('.tab')
let forms = document.querySelectorAll('form')

// Switching tabs and forms
tabs.forEach(Element => {
	Element.addEventListener('click', function () {
		tabs.forEach(element => element.classList.remove('active'))
		forms.forEach(element => element.classList.remove('active'))

		this.classList.add('active')
		forms.forEach(Element => {
			if (Element.id.replace(/^([\W\w]{5})/i, '') === this.id.replace(/^([\W\w]{5})/i, '')) Element.classList.add('active')
		})
	})
})

