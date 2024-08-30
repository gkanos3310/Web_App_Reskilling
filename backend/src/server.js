const express = require('express');
const axios = require('axios');
const cors = require('cors');

const utils = require('./controllers/utils.js');

const data = require('./metadata/data.json');
const postsAPI = data.POSTS_ENDPOINT;
const photosAPI = data.PHOTOS_ENDPOINT;

let articles = [];
let lastUpdateTimestamp = null;

const app = express();

app.use(cors());

//Middleware
app.use(async (req, res, next) => {
    const isCacheEmpty = (articles.length === 0);
    const isCacheDirty = ((Date.now() - lastUpdateTimestamp) > data.CACHE_REFRESH_THRESHOLD);   //the server will refresh the cache every data.CACHE_REFRESH_THRESHOLD milliseconds.

    if(true /*isCacheEmpty || isCacheDirty*/) {
        try {
            //Only for logging purposes. Cache Time Refresh Report.
            /*if(isCacheDirty && !isCacheEmpty) {
                console.log('------------------------------------------------------------');
                console.log('Last cache refresh: ' + ((Date.now() - lastUpdateTimestamp) / 60000).toFixed(2) + ' minutes');
                console.log('CACHE_REFRESH_OPERATION\n------------------------------------------------------------');
            }*/

            const payload = await Promise.all([axios.get(postsAPI), axios.get(photosAPI)]);
            
            articles = utils.buildCombo2(payload[0].data, payload[1].data, payload[0].data.length);
            articles = utils.buildCombo3(payload[0].data, payload[1].data, payload[0].data.length);
            articles = utils.buildCombo(payload[0].data, payload[1].data, payload[0].data.length);
            utils.textMultiplier(articles, 5);

            lastUpdateTimestamp = Date.now();
        }
        catch(e) {
            console.log(e);
            res.status(500).send({errMsg : 'Internal Server Error'});
            res.end();
        }
    }
    
    next();
});

app.get('/posts', async (req, res) => {
    const randomID = utils.getRandomID(parseInt(req.headers.from));
    res.send(articles[randomID]);
    res.end();
});

app.get('/posts/:id', async (req, res) => {
    const targetedID = parseInt(req.headers.from);
    res.send(articles[targetedID]);
    res.end();
});

app.listen(3000);