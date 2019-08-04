
//REST API
const urlSingleUser = `https://api.github.com/users/`;
const urlAllUser = `https://api.github.com/users`;

async function getData(url, userName) {
	const profileResponse = await fetch(`${url}${userName}`);
	return profileResponse.json();
}

// Getting a user name by single input whole word
document.querySelector('form#FormForUser').addEventListener('submit', e => {
	let userName = document.getElementById('UserName').value;

	getData(urlSingleUser, userName)
		.then(userData => {
			if (userData.message === 'Not Found') return userNotFound(userData.message, userName);
			writeProfile(userData);
		})
		.catch(error => userNotFound(error, userName));

	e.preventDefault();
});

// Getting users profiles
document.querySelector('form#FormForID').addEventListener('submit', e => {
	let usersID = `?since=` + document.getElementById('UsersID').value;

	getData(urlAllUser, usersID)
		.then(userData => {
			// if (userData.message === 'Not Found') return userNotFound(userData.message);
			console.log(userData);
			userData.forEach(e => writeProfile(e));
		})
		.catch(error => userNotFound(error, userName));

	e.preventDefault();
});

function writeProfile({ name, login, avatar_url, html_url, public_gists, public_repos, followers, company, blog, location, created_at, following }) {
	if (company == null && 'undefined') company = 'No company';

	let profile = document.createElement('div');
	profile.classList.add('userProfile');
	profile.innerHTML = `
	<div class="remove-record color-gray1">Remove record of <span>${login}.</span></div>
	<div class="photo" style="background-image: url(${avatar_url})"></div>
	<div class="userStatsAll">
		<div class="userStat color-gray1">Public repos: <span>${public_repos}</span></div>
		<div class="userStat color-gray1">Public gists: <span>${public_gists}</span></div>
		<div class="userStat color-gray1">Followers: <span>${followers}</span></div>
		<div class="userStat color-gray1">Following: <span>${following}</span></div>
	</div>
	<div class="userInfo color-gray1">Name: <span>${name}</span> and Login: <span>${login}</span></div>
	<div class="userInfo color-gray1">Company: <span>${company}</span></div>
	<div class="userInfo color-gray1">Web-Site: <span>${blog}</span></div>
	<div class="userInfo color-gray1">Location: <span>${location}</span></div>
	<div class="userInfo color-gray1">Member since: <span>${created_at}</span></div>
	<a class="goToProfile color-gray1" href="${html_url}">View <span>${login}</span> profile on GitHub</a>`;

	document.querySelector('body').insertBefore(profile, document.querySelector('form#FormForID').nextSibling);
	document.querySelectorAll('.remove-record').forEach(e => {
		e.addEventListener('click', removeRecord);
	});
}

function removeRecord() {
	this.parentElement.remove();
}

function userNotFound(error, userName) {
	let message = document.createElement('div');
	message.classList.add('notFound');
	message.classList.add('color-gray1');
	message.innerHTML = `User <span>${userName}</span> not found.<br>(</span>${error}</span>)`;
	document.querySelector('body').appendChild(message);
	setTimeout(() => {
		let message = document.querySelector('.notFound');
		message.remove();
	}, 15000);
}

// Getting a user name by each letter
// document.getElementById('UserName').addEventListener('keyup', e => {
// 	let UserName = e.target.value;
// 	if (e.target.value !== ``) console.log(UserName);
// 	e.preventDefault();
// });