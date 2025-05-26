async function fetchCryptoData() {
    try {
        // Using CoinGecko's API endpoint for top cryptocurrencies
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false,
                    // Add your API key here if you have one (optional for free tier)
                    x_cg_demo_api_key: process.env.CoinGecko_API
                }
            }
        );
        require('dotenv').config();

        console.log(process.env);
        const cryptoData = response.data;
        let tableHtml = '';

        cryptoData.forEach(coin => {
            tableHtml += `
                <tr>
                    <td>
                        <img src="${coin.image}" alt="${coin.name} logo" width="25" class="me-2">
                        ${coin.name} (${coin.symbol.toUpperCase()})
                    </td>
                    <td>$${coin.current_price ? coin.current_price.toLocaleString() : 'N/A'}</td>
                    <td class="${coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}">
                        ${coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : '0.00'}%
                    </td>
                    <td>$${coin.market_cap ? coin.market_cap.toLocaleString() : 'N/A'}</td>
                </tr>
            `;
        });

        document.getElementById('cryptoTable').innerHTML = tableHtml;
        
    } catch (error) {
        console.error("Crypto data error:", error);
        
        // Handle rate limiting or other API errors
        if (error.response && error.response.status === 429) {
            console.error("Rate limit exceeded. Please wait before making another request.");
        }
        
        // Display error message to user
        document.getElementById('cryptoTable').innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">
                    Error loading crypto data. Please try again later.
                </td>
            </tr>
        `;
    }
}

// Alternative function if you want to use your API key as a header
async function fetchCryptoDataWithApiKey(apikey) {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false
                },
                headers: {
                    'x-cg-demo-api-key': apikey
                }
            }
        );

        // Call the function like this:
fetchCryptoDataWithApiKey(process.env.CoinGecko_API);
        
        const cryptoData = response.data;
        let tableHtml = '';

        cryptoData.forEach(coin => {
            tableHtml += `
                <tr>
                    <td>
                        <img src="${coin.image}" alt="${coin.name} logo" width="25" class="me-2">
                        ${coin.name} (${coin.symbol.toUpperCase()})
                    </td>
                    <td>$${coin.current_price ? coin.current_price.toLocaleString() : 'N/A'}</td>
                    <td class="${coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}">
                        ${coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : '0.00'}%
                    </td>
                    <td>$${coin.market_cap ? coin.market_cap.toLocaleString() : 'N/A'}</td>
                </tr>
            `;
        });

        document.getElementById('cryptoTable').innerHTML = tableHtml;
        
    } catch (error) {
        console.error("Crypto data error:", error);
        
        if (error.response && error.response.status === 429) {
            console.error("Rate limit exceeded. Please wait before making another request.");
        }
        
        document.getElementById('cryptoTable').innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">
                    Error loading crypto data. Please try again later.
                </td>
            </tr>
        `;
    }
}
