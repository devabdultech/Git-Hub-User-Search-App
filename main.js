const body = document.querySelector("body");
const themeSwitch = document.getElementById("themeSwitch");
const themeImg = document.getElementById("themeImg");
const themeMode = document.querySelector(".mode");
const container = document.querySelector(".container");
const error = document.querySelector(".error");

themeSwitch.addEventListener('click', () => {
    body.classList.toggle("light-theme");

    if(body.classList.contains("light-theme")) {
        themeMode.textContent = "Dark";
        themeImg.src = "/assets/moon.svg";
    } else {
        themeMode.textContent = "Light";
        themeImg.src = "/assets/sun.svg";
    }
})

const searchUser = document.getElementById("searchUser");
const searchBtn = document.getElementById("searchBtn");
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const userLogin = document.getElementById("userLogin");
const userBio = document.getElementById("userBio");
const userRepo = document.getElementById("userRepo");
const userFollowers = document.getElementById("userFollowers");
const userFollowings = document.getElementById("userFollowings");
const userLocation = document.getElementById("userLocation");
const userBlog = document.getElementById("userBlog");
const userTwitter = document.getElementById("userTwitter");
const userCompany = document.getElementById("userCompany");
const userMail = document.getElementById("userMail");
const userHire = document.getElementById("userHire");

const getUserData = () => {
        fetch(`https://api.github.com/users/${searchUser.value}`)
        .then((response) => response.json())
        .then((data) => {
            userAvatar.src = data.avatar_url;
            userName.textContent = data.name === null ? "No Name :)" : data.name;
            userLogin.textContent = `@${data.login}`;
            userLogin.href = `https://github.com/${data.login}`
            userBio.textContent = data.bio === null ? "This profile has no bio" : data.bio;
            userRepo.textContent = data.public_repos;
            userFollowers.textContent = data.followers;
            userFollowings.textContent = data.following;
            userLocation.textContent = data.location === null ? "Not available" : data.location;
            userBlog.href = data.blog;
            userBlog.textContent = data.blog === "" ? "Not available" : data.blog;
            userTwitter.href = `https://twitter.com/${data.twitter_username}`;
            userTwitter.textContent = data.twitter_username === null ? "Not available" : data.twitter_username;
            userCompany.textContent = data.company === null ? "Not available" : data.company;
            userMail.textContent = data.email === null ? "Not available" : data.company;
            userHire.textContent = data.hireable === null ? "No" : data.hireable;
            console.log(data);

            if(!searchUser.value) {
                error.style.display = "flex";
                container.style.display = "none";
            } else {
                error.style.display = "none";
                container.style.display = "flex";
            }

            if(data.bio === null) {
                userBio.style.opacity = 0.5;
            }

            if(data.location === null) {
                userLocation.style.opacity = 0.5;
            }

            if(data.twitter_username === null) {
                userTwitter.style.opacity = 0.5;
            }
            
            if(data.company === null) {
                userCompany.style.opacity = 0.5;
            }

            if(data.email === null) {
                userMail.style.opacity = 0.5;
            }
            
            if(data.blog === "") {
                userBlog.style.opacity = 0.5;
            }
        })   
}

searchBtn.onclick = () => getUserData();

searchUser.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        getUserData();
    }
})