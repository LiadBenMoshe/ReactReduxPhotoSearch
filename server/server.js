const express = require('express');
const axios = require('axios');
const cors = require("cors");
const app = express();
const port = 8000; //port number
const AMOUNT = 40;
app.use(cors());


let items;
// https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=sport&page=3&per_page=23
async function fetchData(category){
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&per_page=${AMOUNT}`) // get 40 photos 
        items = response.data;
    } catch (error){
        items = null;
        console.error('Error fetching data:', error);
    }
};


// Get the init data
fetchData("sport")
 
// Define the number of items to show per page
const itemsPerPage = 9;

// Define the API endpoint for fetching items
//example: /api/items?page=${page}`
app.get('/api/items', (req, res) => {

    if (!items) {
        res.status(400).send('Bad Request');
    }
    else {
        // Get the page number from the query parameters
        const page = parseInt(req.query.page) || 1;
        // Calculate the start and end indices based on the page number
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        // Get the items for the current page
        const currentPageItems = items.hits.slice(startIndex, endIndex);
        // Send the items as a response
        res.json({
        items: currentPageItems,
        totalPages: items.hits.length / itemsPerPage,
    });
    }
});

// API endpoint named '/new'
// example: '/new?category=animals',
app.get('/new', async (req, res) => {
    const category = req.query.category || 'sport'; // Get the 'category' query parameter or use 'sport' as the default
    await fetchData(category);
    if (!items) {
        res.status(400).send('Bad Request');
    }
    else {
        const page = 1;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const currentPageItems = items.hits.slice(startIndex, endIndex);
        res.json({
            items: currentPageItems,
            totalPages: items.hits.length / itemsPerPage,
        });
    }
  });

  // sort the images by id
  app.get('/sort', async (req, res) => {
    try{
        items.hits.sort((a, b) => a.id - b.id);
        res.status(200).send('OK');
    } catch (error){
        res.status(400).send('Bad Request');
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});