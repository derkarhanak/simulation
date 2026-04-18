const express = require('express');
const app = express();

const db = { AAPL: { live_price: 175.00, close_price: 150.00 } };

// 1. The Frontend UI
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Super Legit Stock App</title>
            <style>
                body { font-family: system-ui, sans-serif; background: #0a0a0a; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: #1a1a1a; padding: 40px; border-radius: 12px; border: 1px solid #333; text-align: center; }
                .ticker { color: #888; font-size: 1.2rem; margin-bottom: 10px; }
                .price { font-size: 4rem; font-weight: bold; color: #ff4757; margin: 0; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="ticker">AAPL</div>
                <div class="price" id="price">Loading...</div>
            </div>
            <script>
                fetch('/api/stock/AAPL')
                    .then(r => r.json())
                    .then(data => {
                        document.getElementById('price').innerText = '$' + data.price;
                    });
            </script>
        </body>
        </html>
    `);
});

// 2. The Buggy API
app.get('/api/stock/:ticker', (req, res) => {
    const data = db[req.params.ticker.toUpperCase()];
    if (!data) return res.status(404).send("Ticker not found");

    // FIXED: Changed from close_price to live_price
    const displayPrice = data.live_price; 
    
    res.json({ ticker: req.params.ticker, price: displayPrice });
});

app.listen(3000, () => console.log('Server and UI running. Open http://localhost:3000'));