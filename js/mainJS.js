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
			writeProfile(userData);
			console.log(userData);
			if (userData.message === "Not Found") return Error;
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
	profile.innerHTML = `<div class="photo" style="background-image: url(${avatar_url})"></div>
						<div class="userDescription">
						\t<div class="userStatsAll">
						\t\t<div class="userStat color-gray2">Public repos: ${public_repos}</div>
						\t\t<div class="userStat color-gray2">Public gists: ${public_gists}</div>
						\t\t<div class="userStat color-gray2">Followers: ${followers}</div>
						\t\t<div class="userStat color-gray2">Following: ${following}</div>
						\t</div>
						\t<div class="userInfo color-gray1">Name: ${name} and Login: ${login}</div>
						\t<div class="userInfo color-gray1">Company: ${company}</div>
						\t<div class="userInfo color-gray1">Web-Site: ${blog}</div>
						\t<div class="userInfo color-gray1">Location: ${location}</div>
						\t<div class="userInfo color-gray1">Member since: ${created_at}</div>
						</div>
						<a class="goToProfile color-gray2" href="${html_url}">View user profile on GitHub</a>`;
	document.querySelector('body').appendChild(profile);
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
	}, 1500);
}
