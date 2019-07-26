// Getting a user name by each letter
// document.getElementById('UserName').addEventListener('keyup', e => {
// 	let UserName = e.target.value;
// 	if (e.target.value !== ``) console.log(UserName);
// 	e.preventDefault();
// });

// Getting a user name by single input whole word
document.querySelector('form').addEventListener('submit', e => {
	let userName = document.getElementById('UserName').value;

	getUser(userName)
		.then(userData => {
			if (userData.message === 'Not Found') return userNotFound(userData.message, userName);
			writeProfile(userData);
		})
		.catch(error => userNotFound(error, userName));

	e.preventDefault();
});

async function getUser(userName) {
	const profileResponse = await fetch(`https://api.github.com/users/${userName}`);
	return profileResponse.json();
}


function writeProfile({name, login, avatar_url, html_url, public_gists, public_repos, followers, company, blog, location, created_at, following}) {
	if (company === null) company = 'No company';

	let profile = document.createElement('div');
	profile.classList.add('userProfile');
	profile.innerHTML = `
	<div class="remove-record color-gray2">Remove record of ${login}.</div>
	<div class="photo" style="background-image: url(${avatar_url})"></div>
	<div class="userStatsAll">
		<div class="userStat color-gray2">Public repos: ${public_repos}</div>
		<div class="userStat color-gray2">Public gists: ${public_gists}</div>
		<div class="userStat color-gray2">Followers: ${followers}</div>
		<div class="userStat color-gray2">Following: ${following}</div>
	</div>
	<div class="userInfo color-gray1">Name: ${name} and Login: ${login}</div>
	<div class="userInfo color-gray1">Company: ${company}</div>
	<div class="userInfo color-gray1">Web-Site: ${blog}</div>
	<div class="userInfo color-gray1">Location: ${location}</div>
	<div class="userInfo color-gray1">Member since: ${created_at}</div>
	<a class="goToProfile color-gray2" href="${html_url}">View user profile on GitHub</a>`;
	document.querySelector('body').appendChild(profile);
	document.querySelector('.remove-record').addEventListener('click', removeRecord);
}



function removeRecord() {
	this.parentElement.remove();

	// removeItem.forEach(function (e) {
	// 	e.addEventListener('click', function () {
	// 		this.parentElement.remove();
	// 	})
	// });
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
