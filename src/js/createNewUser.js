//Modifying date
function formatDate(rawDate) {
	let createdProfile = new Date(rawDate)
	return createdProfile.toLocaleDateString('en-AU',({ year: 'numeric', month: 'long', day: 'numeric' }))
}

export function createNewUser(userData) {

	let createdProfile = formatDate(userData.createdAt)

	let userInformation = document.getElementById('userInformation')
	userInformation.classList.add('activeProfile')
	// let warpProfile = document.createElement('div')
	// warpProfile.classList.add('warpProfile')
	// userInformation.appendChild(warpProfile)

	let background = document.createElement('div')
	background.classList.add('background')

	let nav = document.createElement('nav')
	nav.classList.add('nav-link')
	nav.innerHTML = `
		<div class="backToList color-gray1">Back to users list</div>
		<a class="goToProfile color-gray1" target="_blank" href="${userData.url}">View <span>${userData.login}</span> profile on GitHub</a>
	`

	let extendedProfile = document.createElement('div')
	extendedProfile.classList.add('extendedProfile')
	extendedProfile.innerHTML = `
		<div class="extendedUserPhoto" style="background-image: url(${userData.avatarUrl})"></div>
		<div class="userStatsAll">
			<div class="userStat color-gray1">Public repos: <span>${userData.repositories.totalCount}</span></div>
			<div class="userStat color-gray1">Public gists: <span>${userData.gists.totalCount}</span></div>
			<div class="userStat color-gray1">Followers: <span>${userData.followers.totalCount}</span></div>
			<div class="userStat color-gray1">Following: <span>${userData.following.totalCount}</span></div>
		</div>
		<div class="profileInfo color-gray1">Login: <span>${userData.login}</span></div>
		<div class="profileInfo color-gray1">Name: <span>${userData.name}</span></div>
		<div class="profileInfo color-gray1">Member since: <span>${createdProfile}</span></div>
		<div class="profileInfo color-gray1">Company: <span>${userData.company === null && 'undefined' ? userData.company = `No company` : userData.company}</span></div>
		<div class="profileInfo color-gray1">Web-Site: <span>${userData.websiteUrl}</span></div>
		<div class="profileInfo color-gray1">Employee: <span>${userData.isEmployee ? 'Yes' : 'No'}</span></div>
		<div class="profileInfo color-gray1">E-mail: <span>${userData.email}</span></div>
		<div class="profileInfo color-gray1">Ready to work: <span>${userData.isHireable ? 'Yes' : 'No'}</span></div>
		<div class="profileInfo color-gray1">Location: <span>${userData.location}</span></div>
	`

	let repositories = document.createElement('div')
	repositories.classList.add('repositories')
	if (userData.repositories.totalCount > 0) repositories.innerHTML = `<div class="aboutRepositories color-gray1">All Repositories <span>${userData.name}</span></div>`

	userData.repositories.nodes.forEach(element => {
		let oneRepos = document.createElement('div')
		oneRepos.classList.add('oneRepository')
		oneRepos.innerHTML = `
			<div class="reposName color-gray2"><a href="${element.url}" target="_blank">${element.name}</a></div>
			<div class="reposDate color-gray1">${formatDate(element.createdAt)}</div>
		`
		repositories.appendChild(oneRepos)
	})


	userInformation.parentNode.insertBefore(background, userInformation)
	userInformation.appendChild(nav)
	userInformation.appendChild(extendedProfile)
	userInformation.appendChild(repositories)
	document.querySelector('body').classList.add('noScroll')

	document.querySelector('.backToList').addEventListener('click', () => {
		while (userInformation.firstChild) {
			userInformation.removeChild(userInformation.firstChild)
		}
		background.remove()
		userInformation.classList.remove('activeProfile')
		document.querySelector('body').classList.remove('noScroll')
	})
}