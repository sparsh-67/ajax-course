/* eslint-env jquery */

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
var responseContainer;
var searchedForText;
const form=document.querySelector('#search-form');
function addImage(data){
  console.log('thoda sa chala!');
  let htmlContent=''
  const fimg=data.results[3]
  htmlContent=`<figure>
  <img src="${fimg.urls.regular}" />
  <figCaption>${searchedForText} by ${fimg.user.name}</figCaption>
  </figure>`
  responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
}
function addArticle(data){
  let htmlContent='';
   htmlContent ='<ul>'+data.response.docs.map(article=>`<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2><p>${article.snippet}</p></li>`).join('')+'</ul>';
   responseContainer.insertAdjacentHTML('beforeend',htmlContent);
}
form.addEventListener('submit',function (e){
    e.preventDefault();
    console.log('blablabla!');
    responseContainer=document.querySelector('#response-container');
    searchedForText=document.querySelector('#search-keyword').value;
    responseContainer.innerHTML = '';

    const request1=$.ajax({
      url:`https://api.unsplash.com/search/photos?page=1&query="${searchedForText}"`,
      headers:{
        Authorization : "Client-ID n3dM_268awCAOP1PsHN8Yn49ykm1In0txvocZlTdKq8"
      }

    });
    const request2=$.ajax({
      url:`https://api.nytimes.com/svc/search/v2/articlesearch.json?q="${searchedForText}"&api-key=qnghW029xanCSnClMiE2wfGnAsAY4kEE`
    });
    request1.done(addImage);
    request2.done(addArticle);
});
