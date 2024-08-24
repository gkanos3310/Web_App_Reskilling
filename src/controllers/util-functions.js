export function getRandomID(num) {
    const min = (num - 1) * 33;
    const max = num * 33; 
    return parseInt(Math.random() * (max - min) + min);
}

export function buildCombo(posts, photos, vol) {
    let tmpArticles = [];

    for(let i = 0; i < vol; i++) {
        console.log('-->> ' + posts[i].id);
        tmpArticles.push({id : posts[i].id, title : posts[i].title, body : posts[i].body, url : photos[i].url, thumbnail : photos[i].thumbnailUrl});
    }
    
    return tmpArticles;
}

export function textMultiplier(posts, multiplier) {
    posts.map(post => {
        let finalBody = '';

        for(let i = 0; i < multiplier; i++) {
            finalBody += (post.body + ' ');
        }

        post.body = finalBody;
    });
}