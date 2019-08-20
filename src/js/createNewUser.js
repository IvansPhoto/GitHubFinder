import {queryProfileUser} from './queries'
import {GraphQLClient} from 'graphql-request'

//Modifying date
function formatDate(rawDate) {
	let createdProfile = new Date(rawDate)
	return createdProfile = `${createdProfile.getUTCDay()} ${createdProfile.getUTCMonth()} ${createdProfile.getUTCFullYear()}`
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

let BradTraversy =
	{
		'name': 'Brad Traversy',
		'login': 'bradtraversy',
		'url': 'https://github.com/bradtraversy',
		'email': 'traversymedia@gmail.com',
		'company': 'Traversy Media',
		'createdAt': '2013-09-26T15:36:02Z',
		'location': 'Boston',
		'avatarUrl': 'https://avatars2.githubusercontent.com/u/5550850?v=4',
		'websiteUrl': 'traversymedia.com',
		'id': 'MDQ6VXNlcjU1NTA4NTA=',
		'isEmployee': false,
		'isHireable': true,
		'isDeveloperProgramMember': false,
		'repositories':
			{
				'totalCount': 174,
				'pageInfo': {
					'hasNextPage': true,
					'hasPreviousPage': false,
					'startCursor': 'Y3Vyc29yOnYyOpHOAPfCwQ==',
					'endCursor': 'Y3Vyc29yOnYyOpHOBRQy2g=='
				},
				'nodes': [
					{
						'name': 'mytodo_ci',
						'createdAt': '2014-01-25T18:42:50Z',
						'url': 'https://github.com/bradtraversy/mytodo_ci'
					},
					{
						'name': 'skyapp_bootstrap',
						'createdAt': '2014-09-24T15:37:14Z',
						'url': 'https://github.com/bradtraversy/skyapp_bootstrap'
					},
					{
						'name': 'embertasks',
						'createdAt': '2014-09-26T10:30:34Z',
						'url': 'https://github.com/bradtraversy/embertasks'
					},
					{
						'name': 'html5audioplayer',
						'createdAt': '2014-09-26T10:46:28Z',
						'url': 'https://github.com/bradtraversy/html5audioplayer'
					},
					{
						'name': 'jquery.scrollSlide',
						'createdAt': '2014-10-02T21:08:35Z',
						'url': 'https://github.com/bradtraversy/jquery.scrollSlide'
					},
					{
						'name': 'aioweb',
						'createdAt': '2014-10-08T12:02:16Z',
						'url': 'https://github.com/bradtraversy/aioweb'
					},
					{
						'name': 'jquery.linkIt',
						'createdAt': '2014-10-09T13:43:40Z',
						'url': 'https://github.com/bradtraversy/jquery.linkIt'
					},
					{
						'name': 'bootsassy',
						'createdAt': '2014-10-12T11:50:26Z',
						'url': 'https://github.com/bradtraversy/bootsassy'
					},
					{
						'name': 'rblog',
						'createdAt': '2014-10-23T22:31:05Z',
						'url': 'https://github.com/bradtraversy/rblog'
					},
					{
						'name': 'railscms',
						'createdAt': '2014-10-31T12:30:49Z',
						'url': 'https://github.com/bradtraversy/railscms'
					},
					{
						'name': 'mysubscribers',
						'createdAt': '2015-01-13T19:47:54Z',
						'url': 'https://github.com/bradtraversy/mysubscribers'
					},
					{
						'name': 'mobilecontacts',
						'createdAt': '2015-05-13T15:13:22Z',
						'url': 'https://github.com/bradtraversy/mobilecontacts'
					},
					{
						'name': 'repofinder',
						'createdAt': '2015-05-16T16:00:27Z',
						'url': 'https://github.com/bradtraversy/repofinder'
					},
					{
						'name': 'basicphonegap',
						'createdAt': '2015-05-19T17:49:38Z',
						'url': 'https://github.com/bradtraversy/basicphonegap'
					},
					{
						'name': 'taskmanager',
						'createdAt': '2015-05-22T23:51:38Z',
						'url': 'https://github.com/bradtraversy/taskmanager'
					},
					{
						'name': 'bookstore',
						'createdAt': '2015-10-02T16:34:56Z',
						'url': 'https://github.com/bradtraversy/bookstore'
					},
					{
						'name': 'barchart',
						'createdAt': '2015-12-06T16:09:32Z',
						'url': 'https://github.com/bradtraversy/barchart'
					},
					{
						'name': 'emtasks',
						'createdAt': '2015-12-13T18:16:44Z',
						'url': 'https://github.com/bradtraversy/emtasks'
					},
					{
						'name': 'mylogin',
						'createdAt': '2015-12-14T17:02:44Z',
						'url': 'https://github.com/bradtraversy/mylogin'
					},
					{
						'name': 'fluxboiler',
						'createdAt': '2016-02-08T15:53:12Z',
						'url': 'https://github.com/bradtraversy/fluxboiler'
					},
					{
						'name': 'node_passport_login',
						'createdAt': '2016-03-18T16:02:06Z',
						'url': 'https://github.com/bradtraversy/node_passport_login'
					},
					{
						'name': 'youtube_es2015_source',
						'createdAt': '2016-05-06T15:26:47Z',
						'url': 'https://github.com/bradtraversy/youtube_es2015_source'
					},
					{
						'name': 'wpbootstrap_theme',
						'createdAt': '2016-05-23T16:30:13Z',
						'url': 'https://github.com/bradtraversy/wpbootstrap_theme'
					},
					{
						'name': 'ng2-play',
						'createdAt': '2016-05-23T19:55:19Z',
						'url': 'https://github.com/bradtraversy/ng2-play'
					},
					{
						'name': 'githubsearch',
						'createdAt': '2016-07-07T16:23:20Z',
						'url': 'https://github.com/bradtraversy/githubsearch'
					},
					{
						'name': 'rcontacts',
						'createdAt': '2016-07-21T23:19:54Z',
						'url': 'https://github.com/bradtraversy/rcontacts'
					},
					{
						'name': 'ngspotify',
						'createdAt': '2016-09-06T16:04:53Z',
						'url': 'https://github.com/bradtraversy/ngspotify'
					},
					{
						'name': 'jquery_crash_course',
						'createdAt': '2016-09-18T12:49:46Z',
						'url': 'https://github.com/bradtraversy/jquery_crash_course'
					},
					{
						'name': 'rxjs_boiler',
						'createdAt': '2016-09-20T13:56:59Z',
						'url': 'https://github.com/bradtraversy/rxjs_boiler'
					},
					{
						'name': 'ngauth0',
						'createdAt': '2016-09-30T18:27:29Z',
						'url': 'https://github.com/bradtraversy/ngauth0'
					},
					{
						'name': 'mean_mytasklist',
						'createdAt': '2016-10-02T01:53:46Z',
						'url': 'https://github.com/bradtraversy/mean_mytasklist'
					},
					{
						'name': 'ciblog',
						'createdAt': '2016-11-03T15:51:27Z',
						'url': 'https://github.com/bradtraversy/ciblog'
					},
					{
						'name': 'projectmanager',
						'createdAt': '2016-11-13T12:25:22Z',
						'url': 'https://github.com/bradtraversy/projectmanager'
					},
					{
						'name': 'bizlight_theme',
						'createdAt': '2016-11-17T19:03:32Z',
						'url': 'https://github.com/bradtraversy/bizlight_theme'
					},
					{
						'name': 'escalate_theme',
						'createdAt': '2016-11-29T14:12:14Z',
						'url': 'https://github.com/bradtraversy/escalate_theme'
					},
					{
						'name': 'ionreddit',
						'createdAt': '2016-12-10T15:29:28Z',
						'url': 'https://github.com/bradtraversy/ionreddit'
					},
					{
						'name': 'slimapp',
						'createdAt': '2016-12-15T15:22:59Z',
						'url': 'https://github.com/bradtraversy/slimapp'
					},
					{
						'name': 'vcustomers',
						'createdAt': '2016-12-18T16:03:08Z',
						'url': 'https://github.com/bradtraversy/vcustomers'
					},
					{
						'name': 'angular60',
						'createdAt': '2016-12-22T11:27:01Z',
						'url': 'https://github.com/bradtraversy/angular60'
					},
					{
						'name': 'reactnativeapp',
						'createdAt': '2017-01-07T22:30:27Z',
						'url': 'https://github.com/bradtraversy/reactnativeapp'
					},
					{
						'name': 'bookmarker',
						'createdAt': '2017-01-11T15:36:43Z',
						'url': 'https://github.com/bradtraversy/bookmarker'
					},
					{
						'name': 'jquery-githubfinder',
						'createdAt': '2017-01-18T15:03:02Z',
						'url': 'https://github.com/bradtraversy/jquery-githubfinder'
					},
					{
						'name': 'meanblog',
						'createdAt': '2017-01-24T12:22:00Z',
						'url': 'https://github.com/bradtraversy/meanblog'
					},
					{
						'name': 'django-todolist',
						'createdAt': '2017-01-29T14:34:45Z',
						'url': 'https://github.com/bradtraversy/django-todolist'
					},
					{
						'name': 'bthosting_foundation',
						'createdAt': '2017-02-06T12:15:46Z',
						'url': 'https://github.com/bradtraversy/bthosting_foundation'
					},
					{
						'name': 'acme_keystone',
						'createdAt': '2017-02-08T15:52:12Z',
						'url': 'https://github.com/bradtraversy/acme_keystone'
					},
					{
						'name': 'nodeauthapp',
						'createdAt': '2017-02-16T11:36:24Z',
						'url': 'https://github.com/bradtraversy/nodeauthapp'
					},
					{
						'name': 'meanauthapp',
						'createdAt': '2017-02-18T16:34:31Z',
						'url': 'https://github.com/bradtraversy/meanauthapp'
					},
					{
						'name': 'sampletextgen',
						'createdAt': '2017-02-23T19:15:27Z',
						'url': 'https://github.com/bradtraversy/sampletextgen'
					},
					{
						'name': 'movieinfo',
						'createdAt': '2017-03-16T15:12:02Z',
						'url': 'https://github.com/bradtraversy/movieinfo'
					}
				]
			},
		'gists': {
			'totalCount': 28
		},
		'followers': {
			'totalCount': 14879
		},
		'following': {
			'totalCount': 3
		}
	}