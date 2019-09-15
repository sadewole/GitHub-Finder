const searchUser = document.querySelector('#searchUser')
const searchFound = document.querySelector('#searchFound')
const profile = document.querySelector('#profile')

searchUser.addEventListener('input', checkUserName)

function checkUserName(e) {
    const username = e.target.value

    // Home request to Github
    fetch(`https://api.github.com/users/${username}`, {
            data: {
                client_id: 'd6c602e79ad825c8ceb2',
                client_secret: '7860eab72105c4e981dd9e142bae2885c86e03a2'
            }
        })
        .then(res => res.json())
        .then(user => {
            fetch(`https://api.github.com/users/${username}/repos?per_page=5`, {
                    data: {
                        client_id: 'd6c602e79ad825c8ceb2',
                        client_secret: '7860eab72105c4e981dd9e142bae2885c86e03a2',
                        sort: 'created: asc'
                    }
                })
                .then(res => res.json())
                .then(repo => {
                    const repos = document.querySelector('#repos')
                    repo.forEach(i => {
                        repos.innerHTML += `
                        <div class="card mb-3">
                            <div class="row card-body">
                                <div class="col-md-5 mb-2">
                                    <strong>${i.name}</strong>: ${i.description}
                                </div>
                                <div class="col-md-5 mb-2">
                                <span class="text-white bg-dark p-1">Forks: ${i.forks_count}</span>
                                <span class="text-white bg-primary p-1">Public Gists: ${user.public_gists}</span>
                                <span class="text-white bg-success p-1">Followers: ${i.watchers_count}</span>
                                <span class="text-white bg-info p-1">Following: ${i.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${i.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                                </div>
                            </div
                        </div>
                        `
                    })
                })
            profile.innerHTML = `
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">${user.name}</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid thumbnail" src="${user.avatar_url}"> <br><br>
                        <a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
                    </div>
                    <div class="col-md-9 mt-3">
                        <span class="text-white bg-dark p-2">Public Repos: ${user.public_repos}</span>
                        <span class="text-white bg-primary p-2">Public Gists: ${user.public_gists}</span>
                        <span class="text-white bg-success p-2">Followers: ${user.followers}</span>
                        <span class="text-white bg-info p-2">Following: ${user.following}</span>

                        <br><br>

                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    <div>
                </div>
            </div>
          </div>
          <br><br>
          <h3 class="page-header">Lastest Repos</h3><hr>
          <div id="repos"></div>
            `
        })
        .catch(error => console.error())
}