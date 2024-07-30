// Fonction pour récupérer les données de la cryptomonnaie depuis l'API CoinRanking

async function fetchCryptoData() {
    try {
        const response = await
            fetch('https://api.coinranking.com/v2/coins');
        const data = await response.json();
        return data.data.coins;
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        return [];
    }
}

// Fonction pour afficher les données de la cryptomonnaie dans le tableau

function displayCryptoData(coins) {
    const cryptoTable = document.getElementById('cryptoTable');
    cryptoTable.innerHTML = '';

    coins.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${coin.iconUrl}"
        class="crypto-logo" alt="${coin.name}"></td>
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>$${coin.price}</td>
            <td>${coin.change}%</td>
            <td>${coin.marketCap ? coin.marketCap : '-'}</td>
        `;
        cryptoTable.appendChild(row);
    });
}

// Fonction pour filtrer les cryptomonnaies en fonction de l'entrée utilisateur
function filterCryptoData(coins, searchTerm) {
    searchTerm = searchTerm.toLowerCase();

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );

    return filteredCoins;
}

// // Fonction pour gérer l'entrée de recherche
function handleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    fetchCryptoData().then(coins => {
        const filteredCoins = filterCryptoData(coins,
            searchTerm);
        displayCryptoData(filteredCoins);
    });
}

// // Fonction pour initialiser l'application

async function initializeApp() {
    const coins = await fetchCryptoData();
    displayCryptoData(coins);

// Ajouter un écouteur d'événements à l'entrée de recherche
const searchInput = 
        document.getElementById('searchInput');
    searchInput.addEventListener('input',
        handleSearchInput);
}

// Appeler la fonction initializeApp
// lorsque le contenu du DOM est chargé
document.addEventListener('DOMContentLoaded'
    , initializeApp);
