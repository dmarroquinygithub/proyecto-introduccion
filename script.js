const apiKey = 'eZ_g0pVQcOhKR8u7ueq0kHEtg3lC6-_hLySz6Me8b21n1lsL';
const apiUrl = `https://api.currentsapi.services/v1/latest-news?language=es&apiKey=${apiKey}`;

// Función para obtener las últimas noticias
async function obtenerUltimasNoticias() {
  try {
    console.log('Fetching news...');
    const response = await fetch(apiUrl);
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error('Error al obtener las noticias');
    }
    const data = await response.json();
    console.log('Data:', data);
    mostrarNoticias(data.news);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para mostrar las noticias en el DOM
function mostrarNoticias(noticias) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ''; // Limpiar noticias anteriores

  noticias.forEach(noticia => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const image = document.createElement('img');
    image.classList.add('news-image');
    image.src = noticia.image || 'default-image.jpg'; // Usa una imagen por defecto si no hay imagen en la noticia
    image.alt = noticia.title;

    const title = document.createElement('h2');
    title.classList.add('news-title');
    title.textContent = noticia.title;

    const description = document.createElement('p');
    description.classList.add('news-description');
    description.textContent = noticia.description;

    const url = document.createElement('a');
    url.classList.add('news-url');
    url.href = noticia.url;
    url.textContent = 'Leer más';
    url.target = '_blank';

    newsItem.appendChild(image);
    const textContainer = document.createElement('div');
    textContainer.appendChild(title);
    textContainer.appendChild(description);
    textContainer.appendChild(url);

    newsItem.appendChild(textContainer);
    newsContainer.appendChild(newsItem);
  });
}

// Llamada a la función para obtener las noticias al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  obtenerUltimasNoticias();
  setInterval(obtenerUltimasNoticias, 300000); // Actualiza las noticias cada 5 minutos (300000 milisegundos)
});

