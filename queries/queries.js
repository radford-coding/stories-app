/* for one-time queries to set up our app's database */

let temp;
const getShortestStories = async () => {
    try {
        const response = await fetch('https://shortstories-api.onrender.com/stories');
        if (!response.ok) {
            throw new Error(`response status: ${response.status}`)
        };
        return await response.json();
    } catch (error) {
        console.log(error);
    };
};

temp = await getShortestStories();

temp = Object.values(temp);

console.log(temp[0]);
console.log(temp[1]);
console.log(temp[2]);

temp.forEach(element => {
    console.log(element.author);
});


const getShortStories = async () => {
    try {
        const response = await fetch('https://americanliterature.com/100-great-short-stories/')
        .then(res => res.body)
        .then(res => new Response(res).text());
        return response;
    } catch (error) {
        console.log(error);
    };
};

let temp = await getShortStories();
// console.log(temp);
// const authorRegex = /\<input class\=btn\-sm id\=\.[ \.A-Za-z\(\)]+ type\=button value\=\"(\w+)\"\/\>/g;
const authorRegex = /\<input class\=btn\-sm id\=\.[ \w]+ type\=button (value=)/g;
// let output = authorRegex.exec(temp);
let output = temp.match(authorRegex);
console.log(output);