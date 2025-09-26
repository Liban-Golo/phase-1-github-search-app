


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#github-form");
  const userList = document.querySelector("#user-list");
  const reposList = document.querySelector("#repos-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;

    
    userList.innerHTML = "";
    reposList.innerHTML = "";

    fetch(`https://api.github.com/search/users?q=${searchValue}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.items.forEach((user) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <p><strong>${user.login}</strong></p>
            <img src="${user.avatar_url}" width="80">
            <p><a href="${user.html_url}" target="_blank">Profile</a></p>
          `;
          
          li.addEventListener("click", () => {
            fetch(`https://api.github.com/users/${user.login}/repos`, {
              headers: {
                Accept: "application/vnd.github.v3+json",
              },
            })
              .then((res) => res.json())
              .then((repos) => {
                reposList.innerHTML = "";
                repos.forEach((repo) => {
                  const repoLi = document.createElement("li");
                  repoLi.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                  reposList.appendChild(repoLi);
                });
              });
          });
          userList.appendChild(li);
        });
      });
  });
});
