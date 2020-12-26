

    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    var searchedForText;
    var responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const UnPlashRequest=new XMLHttpRequest();
        UnPlashRequest.open('GET',`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        UnPlashRequest.onload=addImage;
        UnPlashRequest.onerror=handleError;
        UnPlashRequest.setRequestHeader('Authorization', 'Client-ID n3dM_268awCAOP1PsHN8Yn49ykm1In0txvocZlTdKq8');
        UnPlashRequest.send();
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=qnghW029xanCSnClMiE2wfGnAsAY4kEE`);
        articleRequest.send();

    });
    function addImage(){
      let htmlContent='';
      const data=JSON.parse(this.responseText);
      if(data && data.results && data.results[0]){
        const firstImage=data.results[0];
        htmlContent =` <figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}"">
        <figCaption>${searchedForText} by ${firstImage.user.name}</figCaption>

        </figure>`;
      }else{
        htmlContent=`<div class="error-no-image">No Image Availible</div>`;
      }
      responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }
    function handleError(){
      console.log('Error aa gaya BC!');
    }
    function addArticles () {
        let htmlContent='';

        const data=JSON.parse(this.responseText);

        if(data && data.response && data.response.docs.length>0){
          htmlContent ='<ul>'+data.response.docs.map(article=>`<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2><p>${article.snippet}</p></li>`).join('')+'</ul>';
        }else{
          htmlContent=`<div class="error-no-articles">No Articles Availible</div>`;
        }
        responseContainer.insertAdjacentHTML('beforeend',htmlContent);
    }
