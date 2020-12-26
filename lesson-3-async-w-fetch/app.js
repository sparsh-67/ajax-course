// (function () {
//     const form = document.querySelector('#search-form');
//     const searchField = document.querySelector('#search-keyword');
//     let searchedForText;
//     const responseContainer = document.querySelector('#response-container');
//
//     form.addEventListener('submit', function (e) {
//         e.preventDefault();
//         responseContainer.innerHTML = '';
//         searchedForText = searchField.value;
//     });
// })();
const form=document.getElementById('search-form');
var responseContainer=document.getElementById('response-container');
var searchedForText;
form.addEventListener('submit',function(e){
  e.preventDefault();
  searchedForText=document.getElementById('search-keyword').value;
  fetch(`https://api.unsplash.com/search/photos?page=1&query="${searchedForText}"`,{headers:{Authorization:"Client-ID n3dM_268awCAOP1PsHN8Yn49ykm1In0txvocZlTdKq8"}})
    .then(response=>response.json())
    .then(addImage)
    .catch(handleError);
  fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q="${searchedForText}"&api-key=qnghW029xanCSnClMiE2wfGnAsAY4kEE`)
    .then(response=>response.json())
    .then(addArticle)
    .catch(handleError);    
})
function addArticle(data){
  let htmlContent='<ul>'+data.response.docs.map(article=>`<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2><p>${article.snippet}</p></li>`).join('')+'</ul>';
  responseContainer.insertAdjacentHTML('beforeend',htmlContent);
}
function handleError(err){
  let htmlContent='<p>Something went wrong :(</p>';
  responseContainer.insertAdjacentHTML('beforeend',htmlContent);
}
function addImage(data){
  let htmlContent='';
  const fimg=data.results[0];
  htmlContent=`<figure>
  <img src="${fimg.urls.regular}" />
  <figCaption>${searchedForText} by ${fimg.user.name}</figCaption>
  </figure>`;
  responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
}
