const authToken = "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";
const searchName = document.querySelector("[data-searchName]");
const displayContainer = document.querySelector(".display-container")
const errorMessage = document.querySelector(".error");
CallData("aryangupta1105")
async function CallData(username){
        const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url , { 
        headers: {
        'Authorization' : ` ${authToken}`,
    }});
    const data = await response.json();
    renderDataUI(data);

}
const searchForm = document.querySelector("[data-searchForm]");
searchForm.addEventListener("submit" ,(e)=>
{
    e.preventDefault();
    if(searchName.value === "") CallData("aryangupta1105");
    
        CallData(searchName.value);
        searchName.value = "";
});


function renderDataUI(data){
    errorMessage.style.scale = 0;

    if (data.message !== "Not Found")
    {
        function checkNull(apiItem, domItem) 
        {
            if (apiItem === "" || apiItem === null) {
                domItem.style.opacity = 0.5;
                domItem.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else {
                return true;
            }
        }
        
        
        
        const profilepic = document.querySelector("[data-profilePic]");
        const bio = document.querySelector("[data-bio]");
        const followers = document.querySelector("[data-followers]")
        const following = document.querySelector("[data-following]")
        const repos = document.querySelector("[data-repos]")
        const displayName = document.querySelector("[data-username]");
        const usernameUrl = document.querySelector("[data-usernameUrl]");
        const joinDate = document.querySelector("[data-joinDate]");
        const location = document.querySelector("[data-location]");
        const twitter = document.querySelector("[data-twitter]");
        const company = document.querySelector("[data-company]");
        const website = document.querySelector("[data-website]");
        const newDate = formatDate(data?.created_at);
        
        let arr = [profilepic , bio , followers , following , repos , displayName , joinDate , twitter , usernameUrl , company , website , newDate];
        profilepic.src = data?.avatar_url ;
        bio.innerText = data?.bio ;
        followers.innerText = data?.followers;
        followers.href = `${data?.followers_url}`;
        following.innerText = data?.following;
        following.href = `${data?.following_url}`;
        repos.href = `${data?.repos_url}`;
    repos.innerText = data?.public_repos;
    displayName.innerText = data?.name;
    joinDate.innerText = newDate;
    usernameUrl.innerText = `@${data?.login}`;
    usernameUrl.href = `${data?.url}`;
    location.innerText = `${data?.location}`;
    company.innerText = `${data?.company}`;
    twitter.innerText = `@${data?.twitter_username}`;
    twitter.href = `https://twitter.com/
    ${data?.twitter_username}`;
    website.innerText = `@${data?.login}`;
    website.href = `${data?.url}`;

    bio.innerText = (data?.bio === null) ? "This Profile has no Bio" : data?.bio;

    location.innerText = checkNull(data?.location, location) ? data?.location : "Not Available";
    
    website.innerText = checkNull(data?.blog, website) ? data?.blog : "Not Available";
    
    website.href = checkNull(data?.blog, website) ? data?.blog : "#";
    
    twitter.innerText = checkNull(data?.twitter_username, twitter) ? data?.twitter_username : "Not Available";
    
    twitter.href = checkNull(data?.twitter_username, twitter) ? `https://twitter.com/${data?.twitter_username}` : "#";
    
    company.innerText = checkNull(data?.company, company) ? data?.company : "Not Available";
}

    else {
        errorMessage.style.scale = 1;
        setTimeout(() => {
            errorMessage.style.scale = 0;
        }, 1500);
    
  
}
}

function formatDate(dateString) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const date = new Date(dateString);
  const formattedDate = ("0" + date.getDate()).slice(-2);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `Joined ${formattedDate} ${month} ${year}`;
}

// Switching modes of the webpage:

const mode = document.querySelector("[data-darkMode]")
const modeData = document.querySelector("[data-Mode]")
const profieData = document.querySelector(".Profile-data")


mode.addEventListener("click" , ()=>{
    switchMode();
})
const container = document.querySelector("#wrapper");
const modeImg = document.querySelector("[data-modeImg]");
function enableDarkMode(){
    modeData.innerText = "DARK";
        modeImg.src = "./images/moon-icon.svg"
        container.classList.add("dark");
        searchForm.classList.add("dark1");
        profieData.classList.add("dark");
        displayContainer.classList.add("dark1");
}

function enableLightMode(){
    modeData.innerText = "LIGHT";
        profieData.classList.remove("dark");
        modeImg.src = "./images/sun-icon.svg"
        container.classList.remove("dark");
        searchForm.classList.remove("dark1");
        displayContainer.classList.remove("dark1");
}
function switchMode(){
    
    if(!container.classList.contains("dark"))
    {
        enableDarkMode();
        
    }
    else{
        enableLightMode();
    }
}

// Checking if default mode in darkmode or not:

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;


if(localStorage.getItem("dark-mode")=== null){
    if(prefersDarkMode){
        enableDarkMode();
    }
    else{
        enableLightMode();
    }
}
else{
    if(localStorage.getItem("dark-mode" === true)){
        enableDarkMode();
    }
    else{
        enableLightMode();
    }
}