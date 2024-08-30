module.exports = {
    //Generates a random integer in the range of [1-100]
    getRandomID : function(num) {
        const min = (num - 1) * 33;
        const max = num * 33; 
        return parseInt(Math.random() * (max - min) + min);
    },

    //Combines the 2 api payloads to a single one.
    buildCombo : function(posts, photos, vol) {
        //na kanw validity na enwnw ta swsta apis  --> check forEach
        let tmpArticles = [];
    
        for(let i = 0; i < vol; i++) {
            tmpArticles.push({id : posts[i].id, title : posts[i].title, body : posts[i].body, url : photos[i].url, thumbnail : photos[i].thumbnailUrl});
        }
        
        return tmpArticles;
    },

    buildCombo2 : function(posts, photos, vol) {
        let tmpArticles = [];

        const filteredPhotos = photos.filter(elem => (elem.id >= 0 && elem.id <= 100));
        
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        console.time('Build standard');

        //for(let j = 0; j < 10000; j++) {
            tmpArticles = [];
            for(let i = 0; i < posts.length; i++) {
                const photo = photos.find(pic => pic.id === posts[i].id);
                tmpArticles.push({id : posts[i].id, title : posts[i].title, body : posts[i].body, url : photo.url, thumbnail : photo.thumbnailUrl});
            }
        //}

        const end = Date.now();
        //console.log('Build 2 time: ' + (end - begin));
        console.timeEnd('Build standard');
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        
        return tmpArticles;
    },

    buildCombo3 : function(posts, photos, vol) {
        let seedList = new Array(10);
        let tmpArticles = [];

        for(let i = 0; i < 10; i++) {
            seedList[i] = [];
        }

        const filteredPhotos = photos.filter(elem => (elem.id >= 0 && elem.id <= 100));

        //-------------------------------------------------------------------------------------------------------------------------------------------------
        console.time('Build custom');
        const begin = Date.now();

        for(let i = 0; i < photos.length; i++) {
            seedList[parseInt(photos[i].id) % 10].push(photos[i]);
        }
    
        //for(let j = 0; j < 10000; j++) {
            tmpArticles = [];
            for(let i = 0; i < posts.length; i++) {
                const photo = seedList[parseInt(posts[i].id) % 10].find(pic => pic.id === posts[i].id);
                tmpArticles.push({id : posts[i].id, title : posts[i].title, body : posts[i].body, url : photos[i].url, thumbnail : photos[i].thumbnailUrl});
            }
        //}

        const end = Date.now();
        //console.log('Build 3 time: ' + (end - begin));
        //console.log('---------------------------------');
        console.timeEnd('Build custom');
        
        console.log('');
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        
        return tmpArticles;
    },

    //Multiplies the given string 'multiplier' times.
    textMultiplier : function(posts, multiplier) {
        posts.map(post => {
            let finalBody = '';
    
            for(let i = 0; i < multiplier; i++) {
                finalBody += (post.body + ' ');
            }
    
            post.body = finalBody;
        });
    }
}
