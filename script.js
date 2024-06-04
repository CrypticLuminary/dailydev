const apiURL = 'https://newsapi.org/v2/everything?q=cricket&from=2024-05-04&sortBy=publishedAt&apiKey=5747e62f7e054b089f8f7d55ae97de53';
const fallbackImageURL = 'https://i.pinimg.com/736x/10/03/8d/10038dbbb2445ac9501bbd4c04453a16.jpg';
let page = 1; // Track the current page
const pageSize = 50; // Number of articles per page

// Function to fetch data from the API
async function fetchNews(page) {
    try {
        showLoading();
        const response = await fetch(`${apiURL}&page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
        hideLoading();
    } catch (error) {
        console.error('Error fetching the news:', error);
        hideLoading();
    }
}

function displayNews(articles) {
    const cardSection = document.querySelector('.card_section');
    articles.map(article => {
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card');

        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const icon = document.createElement('div');
        icon.classList.add('icon');

        const title = document.createElement('h2');
        title.textContent = `${article.title.slice(0,50)+"..."}`;

        const tags = document.createElement('div');
        tags.classList.add('tags');
        const tag = document.createElement('span');
        tag.textContent = '#news';
        tags.appendChild(tag);

        const readTime = document.createElement('p');
        readTime.classList.add('read-time');
        readTime.textContent = new Date(article.publishedAt).toDateString();

        cardHeader.appendChild(icon);
        cardHeader.appendChild(title);
        cardHeader.appendChild(tags);
        cardHeader.appendChild(readTime);

        // Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const image = document.createElement('img');
        image.src = article.urlToImage || fallbackImageURL;
        image.alt = article.title;

        cardBody.appendChild(image);``

        // Card footer
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        const stats = document.createElement('div');
        stats.classList.add('stats');

        const likeSpan = document.createElement('span');
        likeSpan.textContent = '❤️';

        const commentSpan = document.createElement('span');
        commentSpan.textContent = '💬';

        const bookmarkSpan = document.createElement('span');
        bookmarkSpan.textContent = '🔖';

        const shareSpan = document.createElement('span');
        shareSpan.textContent = '🔗';

        stats.appendChild(likeSpan);
        stats.appendChild(commentSpan);
        stats.appendChild(bookmarkSpan);
        stats.appendChild(shareSpan);

        cardFooter.appendChild(stats);

        // Append header, body, and footer to the card
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        // Append the card to the card section
        cardSection.appendChild(card);
    });
}

// Function to show loading animation
function showLoading() {
    const loading = document.querySelector('.loading');
    loading.style.display = 'block';
}

// Function to hide loading animation
function hideLoading() {
    const loading = document.querySelector('.loading');
    loading.style.display = 'none';
}

// Function to handle infinite scroll
function handleInfiniteScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        page++;
        fetchNews(page);
    }
}

// Initial fetch
fetchNews(page);

// Add scroll event listener for infinite scroll
window.addEventListener('scroll', handleInfiniteScroll);