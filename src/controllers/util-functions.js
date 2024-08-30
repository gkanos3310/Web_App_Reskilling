//Generates a random integer in the range of [1-100]
export function getRandomID(num) {
    const min = (num - 1) * 33;
    const max = num * 33; 
    return parseInt(Math.random() * (max - min) + min);
}

//Combines the 2 api payloads to a single one.
export function buildCombo(posts, photos, vol) {
    let tmpArticles = [];

    for(let i = 0; i < vol; i++) {
        tmpArticles.push({id : posts[i].id, title : posts[i].title, body : posts[i].body, url : photos[i].url, thumbnail : photos[i].thumbnailUrl});
    }
    
    return tmpArticles;
}

//Multiplies the given string 'multiplier' times.
export function textMultiplier(posts, multiplier) {
    posts.map(post => {
        let finalBody = '';

        for(let i = 0; i < multiplier; i++) {
            finalBody += (post.body + ' ');
        }

        post.body = finalBody;
    });
}

//Checks if the given url is in a valid form after the manual edit from the user.
export function isValidURL(url) {
    const urlTokens = url.split(':');
    const postId = urlTokens[urlTokens.length - 1];
    const numId = Math.floor(Number(postId));

    return (numId !== Infinity && String(numId) === postId && numId > 0 && numId <= 100 && url.substr(0, url.length - 3) === 'http://localhost:5173/posts/');
}