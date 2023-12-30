document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'eb0cf552';
  const showfirst = 'Brasil'; //info da api que aparece primeiro ao carregar a página
  const lista = document.getElementById('movieList');
  const btnOrdenarAlfabeticamente = document.getElementById('btnOrdenarAlfabeticamente');
  const btnOrdenarPorAno = document.getElementById('btnOrdenarPorAno');

 
  fetch(`https://www.omdbapi.com/?s=${showfirst}&apikey=${apiKey}`)
      .then(function (result) {
          return result.json();
      })
      .then(function (json) {
          localStorage.setItem('movies', JSON.stringify(json));
          carregaLista(json);
      });


  const frmPesquisa = document.querySelector("form");
  frmPesquisa.onsubmit = function (ev) {
      ev.preventDefault();

      const pesquisa = ev.target.pesquisa.value;

      if (pesquisa === "") {
          alert('Preencha o campo de pesquisa!');
          return;
      }


      fetch(`https://www.omdbapi.com/?s=${pesquisa}&apiKey=${apiKey}`)
          .then(function (result) {
              return result.json();
          })
          .then(function (json) {
              localStorage.setItem('movies', JSON.stringify(json));
              carregaLista(json);
          });
  }


  btnOrdenarAlfabeticamente.addEventListener('click', function () {
      ordenarAlfabeticamente();
  });

  btnOrdenarPorAno.addEventListener('click', function () {
      ordenarPorAno();
  });


  const carregaLista = function (json) {
      lista.innerHTML = "";

      json.Search.forEach(function (element) {
          let item = document.createElement("div");
          item.classList.add("item");
          item.innerHTML = `<img src="${element.Poster}" /><h2>${element.Title}</h2><p>${element.Year}</p>`;
          lista.appendChild(item);
      });
  }


  const ordenarAlfabeticamente = function () {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const sortedMovies = [...movies.Search].sort(function (a, b) {
          return a.Title.localeCompare(b.Title);
      });
      carregaLista({ Search: sortedMovies });
  }

  const ordenarPorAno = function () {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const sortedMovies = [...movies.Search].sort(function (a, b) {
          return parseInt(a.Year) - parseInt(b.Year);
      });
      carregaLista({ Search: sortedMovies });
  }
});
