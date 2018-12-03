const getData = () => {
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(data => data.json())
    .then(data => {
        const newsIdArr = data.slice(0,50);
        newsIdArr.map(newsId => {
          return fetch('https://hacker-news.firebaseio.com/v0/item/' + newsId + '.json')
          .then(newsData => newsData.json())
          .then(newsData => {
            let ul = document.getElementById('news-list');
            let li = document.createElement('li');
            let div = document.createElement('div');
            div.classList.add('comment-content');
            li.innerHTML = `
              <div class="title-content">
                <span class="title">${newsData.title}</span>
                <span class="comments-num">${newsData && newsData.kids ? newsData.kids.length : 0} <br> Comments</span> 
              </div>
            `
            ul.appendChild(li);
            li.appendChild(div);

            li.addEventListener('click', () => {

              if(div.innerHTML != ''){
                div.innerHTML = '';
              } else {
                while(div.firstChild) {
                  div.removeChild(div.firstChild);
                }
                newsData.kids.map(commentId => {
                  return fetch('https://hacker-news.firebaseio.com/v0/item/' + commentId + '.json')
                    .then(comments => comments.json())
                    .then(comments => {
                      let p = document.createElement('p');
                      p.classList.add('comment');
                      p.appendChild(document.createTextNode(comments.text));
                      div.appendChild(p);
                    })
                })
              }
            });
          });
        })

    })
}

getData();