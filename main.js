"use strict";

// json 통신해서 데이터 받아오기
function loadItems() {
  return (
    fetch("data/data.json")
      // 성공하면 response 리턴
      .then((response) => response.json())
      .then((json) => json.items)
  );
}

// 주어진 items를 리스트로 업데이트 한다
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// item 데이터를 받아옷 것으로 HTML item 리스트를 만든다
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__img" />
    <p class="item__description"> ${item.gender}, ${item.size}</p>
  </li>
  `;
}

// logo, buttons 클릭 처리
function setEventListeners(items) {
  const logo = document.querySelector(".header__logo");
  const buttons = document.querySelector(".menu");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

// main
loadItems()
  // data.josn 파일을 동적으로 읽어와야 하기 때문에 시간이 걸려 프로미스 리턴해야함
  // 성공하면
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  // 성공적으로 되지 않으면 catch 이용해 경고문구
  .catch(console.log);
