const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let bids = [];

const getActiveAuctions = async () => {
    try {
        const response = await axios.get('http://uptime-auction-api.azurewebsites.net/api/Auction');
        const auctions = response.data.map(auction => ({
            id: auction.productId,
            name: auction.productName,
            description: auction.productDescription,
            category: auction.productCategory,
            biddingEndDate: auction.biddingEndDate
        }));
        return auctions.filter(auction => new Date(auction.biddingEndDate) > new Date());
    } catch (error) {
        console.error('Error getting auction ', error);
        return [];
    }
};

app.get('/api/auctions', async (req, res) => {
    const activeAuctions = await getActiveAuctions();
    res.json(activeAuctions);
});

app.get('/api/auctions/:category', async (req, res) => {
    const { category } = req.params;
    const activeAuctions = await getActiveAuctions();
    const filteredAuctions = activeAuctions.filter(auction => auction.category === category);
    res.json(filteredAuctions);
});

app.post('/api/bid', (req, res) => {
    const { id, fullName, bidAmount } = req.body;
    const bidTime = new Date();

    if (!id || !fullName || !bidAmount) {
        return res.status(400).json({ message: 'Fill' });
    }

    bids.push({ id, fullName, bidAmount, bidTime });
    res.json({ message: 'ok' });
});

app.get('/api/bids/:id', (req, res) => {
    const { id } = req.params;
    const productBids = bids.filter(bid => bid.id === id);
    res.json(productBids);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
