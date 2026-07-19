// 1. Paste your Supabase connection details here
const SUPABASE_URL = "https://sb_publishable_wswJWkoKKXbTLagf3bPsRA_J-RSdEBY";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4aGVoZGNianZmemltYWhraXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NzU2MjcsImV4cCI6MjEwMDA1MTYyN30.3xlw7LQWI5bEJqS28hD2cqWkWK0YdYATtX-iyp_5JDs";

// 2. Initialize the Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 3. Fetch data from the database and display it
async function fetchCatalog() {
    const { data: photoStyles, error } = await supabase
        .from('photo_styles')
        .select('*');

    if (error) {
        console.error('Error fetching catalog:', error);
        return;
    }

    const gridContainer = document.getElementById('catalog-grid');
    gridContainer.innerHTML = ''; // Clear empty container

    // Loop through each item in the database and create the HTML structure
    photoStyles.forEach(style => {
        const card = document.createElement('div');
        card.className = 'catalog-card';
        
        card.innerHTML = `
            <img src="${style.image_url || 'https://via.placeholder.com/300'}" alt="${style.title}">
            <h3>${style.title}</h3>
            <p>${style.description || ''}</p>
            <span class="price">$${style.price}</span>
            <button class="buy-btn">Select Style</button>
        `;
        
        gridContainer.appendChild(card);
    });
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', fetchCatalog);