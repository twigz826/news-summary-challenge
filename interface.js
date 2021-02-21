const url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?order-by=newest";
let news = new News();

function getData() {
  return fetch(url).then(response => {
    return response.json();
  });
}

getData().then(post => {
  let newsData = post.response.results
  printTitles(newsData)
});
