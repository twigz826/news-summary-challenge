// Variables
let url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?order-by=newest";
let news = new News();
let myImage = "/Users/ttwigden/Desktop/Makers/Projects/week-7/news-summary-challenge/images/Peter_Griffin.png"
let modal = document.getElementById("articleModal");
let span = document.getElementById("close");

// Event listeners
span.addEventListener('click', closeModal, false)
window.addEventListener('hashchange', openModal, false)

// Functions
function getData() {
  return fetch(url).then(response => {
    console.log(response.json());
    return response.json();
  });
}

getData().then(post => {
  let newsData = post.response.results
  saveAll(newsData)
});

function saveAll(articles) {
  articles.forEach(article => {
    let headline = article.webTitle;
    let image = myImage;
    let story = "No story";
    let url = article.webUrl;
    console.log(article.fields);
    // if (article.fields)
    //   image = article.fields.thumbnail
    //   story = article.fields.body
    let newsArticle = new Article(headline, image, story, url);
    news.add(newsArticle)
  });
  displayAll()
}

function displayAll() {
  let articles = news.getArticles()
  console.log(articles);
  articles.forEach((article, index) => {
    let headlinesDiv = document.getElementById("headlines")
    let headlineDiv = document.createElement('div')
    headlineDiv.insertAdjacentHTML('beforeend', `<img src=${article.getImageURL()}>`)
    headlineDiv.insertAdjacentHTML('beforeend', `<h3><a href=#${index}>${article.getHeadline()}</a></h3>`)
    headlinesDiv.appendChild(headlineDiv)
  })
}

function openModal() {
  modal.style.display = "block";
  let articles = news.getArticles()
  let index = location.href.split('#')[1]
  console.log(index);
  let selectedArticle = articles[index]
  let selectedArticleDiv = document.getElementById("selectedArticle")
  console.log(selectedArticle)
  selectedArticleDiv.insertAdjacentHTML('beforeend', `<h1><a href='${selectedArticle.getArticleURL()}'>${selectedArticle.getHeadline()}</a></h1>`)
  selectedArticleDiv.insertAdjacentHTML('beforeend', `${selectedArticle.getStory()}`)
}

function closeModal() {
  modal.style.display = "none";
  // reset to no hash?
}
