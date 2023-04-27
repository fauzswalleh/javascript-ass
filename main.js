// github API on browser
const gitHubForm = document.getElementById('gitHubForm');
gitHubForm.addEventListener('submit',(e) => {
    e.preventDefault();
    let usernameInput = document.getElementById('usernameInput');

    // get the value of the github username
    let gitHubUsername = usernameInput.ariaValueMax;
    requestUserRepos(gitHubUsername)
    .then(response => response.json())
    .then(data => {
        for(let i in data){
            if (data.message === "not found") {
                let ul = document.getElementById('userRepos');
                let li = document.createElement('li')
                li.classList.add('list-group-item')
                li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${gitHubUsername}</p>
                `);
                // append all the li to the li
                ul.appendChild(li);
            }else {

                let ul = document.getElementById('userRepos');
                let li = document.createElement('li');

                // add bootstrap list item class to each li
                li.classList.add('list-group-item')
                li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_URL}</a></p>
                `);

                // append each li to the ul
                ul.appendChild(li);
            }
        }
    })
})
function requestUserRepos(username) {
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}