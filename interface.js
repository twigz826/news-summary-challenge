const url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?order-by=newest";
let out = "";
let articles = []

getData();

function getData() {
  return fetch(url).then((response) => {
    return response.json()
  });
}
