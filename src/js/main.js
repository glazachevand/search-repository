const form = document.getElementsByName("searchform")[0];
const search = form.elements.search;
const repositories = document.querySelector(".repositories");
// длина строки поиска
const min = 3;
document.querySelector('.search-repo__notes span').textContent = min;
// кол-во выводимых результатов поиска
const count = 10;

form.addEventListener("submit", submitHandler);

search.addEventListener("input", removeError);

function submitHandler(e) {
  e.preventDefault();
  removeError();
  if (!validate(this)) return;

  document.querySelector('.search-results__title span').innerHTML = ``;
  repositories.innerHTML = `<div class="preloader-container"><div class="preloader"></div></div>`;

  let url = new URL(`https://api.github.com/search/repositories?q=${search.value}+in:name`);

  if (this.check.checked) {
    url.searchParams.set("sort", "stars");
    url.searchParams.set("order", "desc");
  }

  fetch(url, {
    headers: {
      Accept: "application/vnd.github.text-match+json",
    },
  })
    .then((response) => {
      if (response.ok !== true) {
        throw Error("Could not fetch the data from this resource");
      }
      return response.json();
    })
    .then((result) => {
      repositories.innerHTML = '';
      renderSearchResults(result);
      console.log(result);
    })
    .catch((err) => {
      repositories.innerHTML = '';
      repositories.insertAdjacentHTML("beforeend", `<div class="repositories__empty">Ошибка: ${err.message}</div>`);
    });

  form.reset();
}

function validate(form) {
  if (search.value.length < min) {
    showError();
    return false;
  } else {
    return true;
  }
}

function showError() {
  const message = document.createElement("div");
  message.className = "message-error";
  message.innerHTML = `Введите подстроку не менее ${min} символов`;
  message.style.left = 0;
  message.style.top = "5px";
  search.classList.add("invalid");
  document.querySelector('.search-repo__search-row').after(message);
}

function removeError() {
  document.querySelector(".message-error")?.remove();
  search.classList.remove("invalid");
}

function renderSearchResults(result) {

  if (result.items.length === 0) {
    repositories.insertAdjacentHTML("beforeend", `<div class="repositories__empty">Ничего не найдено</div>`);
  } else {
    repositories.insertAdjacentHTML("beforeend", `<ul class="repositories__list"></ul>`);

    const searchLength = Math.min(count, result.items.length);
    document.querySelector('.search-results__title span').innerHTML = ` (${searchLength} из ${result.total_count})`;

    for (let i = 0; i < searchLength; i++) {
      renderSearchItem(result.items[i]);
    }
  }
}

function renderSearchItem(item) {
  const repositoriesItem = document.createElement('LI');
  repositoriesItem.className = 'repositories__item repositories-item';

  let html =
    `<div class="repositories-item__name">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo mr-1 color-fg-muted">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072
      1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0
      1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
    </svg>
    <a href="${item.html_url}" target="_blank">${item.name}</a></div>`
  if (item.description) html += `<p class="repositories-item__description">${item.description}</p>`;
  if (item.owner.login) html +=
    `<div class="repositories-item__login"><span>Логин:</span> <a href="${item.owner.html_url}" target="_blank" >${item.owner.login}</a></div>`;
  if (item.created_at) html +=
    `<div class="repositories-item__date">
    <time datetime="${item.created_at}">Дата создания: ${new Date(item.created_at).toLocaleDateString("ru-RU")}</time></div>`;
  if (item.updated_at) html +=
    `<div class="repositories-item__date">
    <time datetime="${item.updated_at}">Дата последнего обновления: ${new Date(item.updated_at).toLocaleDateString("ru-RU")}</time></div>`;
  if (item.homepage) html +=
    `<div class="repositories-item__homepage"><a href="${item.homepage}" target="_blank" >Сайт</a></div>`;

  repositoriesItem.innerHTML = html;
  document.querySelector('.repositories__list').append(repositoriesItem);
}
