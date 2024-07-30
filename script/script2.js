function convertCrypto() {
    // Récupérer la valeur saisie par l'utilisateur pour la quantité de crypto-monnaie
    const cryptoInput = document.getElementById('cryptoInput').value;
    
    // Récupérer la crypto-monnaie sélectionnée par l'utilisateur (par exemple, 'bitcoin')
    const cryptoSelect = document.getElementById('cryptoSelect').value;
    
    // Récupérer la monnaie fiduciaire sélectionnée par l'utilisateur (par exemple, 'usd')
    const fiatSelect = document.getElementById('fiatSelect').value;

    // Appeler l'API de CoinGecko pour obtenir le prix actuel de la crypto-monnaie en monnaie fiduciaire
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSelect}&vs_currencies=${fiatSelect}`)
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            // Récupérer le prix de la crypto-monnaie en monnaie fiduciaire
            const priceInFiat = data[cryptoSelect][fiatSelect.toLowerCase()];
            
            // Calculer le résultat de la conversion
            const result = cryptoInput * priceInFiat;
            
            // Afficher le résultat de la conversion dans l'interface utilisateur
            document.querySelector('.result').style.display = '';   
            document.getElementById('conversionValue').textContent = `1 ${cryptoSelect.toUpperCase()} = ${priceInFiat} ${fiatSelect.toUpperCase()}`;
            document.getElementById('conversionResult').textContent = `${result.toFixed(2)} ${fiatSelect.toUpperCase()}`;
        })
        .catch(error => console.error('Error fetching data:', error)); // Gérer les erreurs éventuelles
}
