/* for one-time queries to set up our app's database */

// let temp;
// const getShortestStories = async () => {
//     try {
//         const response = await fetch('https://shortstories-api.onrender.com/stories');
//         if (!response.ok) {
//             throw new Error(`response status: ${response.status}`)
//         };
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     };
// };

// temp = await getShortestStories();

// temp = Object.values(temp);

// console.log(temp[0]);
// console.log(temp[1]);
// console.log(temp[2]);

// temp.forEach(element => {
//     console.log(element.author);
// });


// const getShortStories = async () => {
//     try {
//         const response = await fetch('https://americanliterature.com/100-great-short-stories/');
//         if (!response.ok) {
//             throw new Error(`response status: ${response.status}`)
//         };
//         return await response.string();
//     } catch (error) {
//         console.log(error);
//     };
// };

// let temp = await getShortStories();

// temp = parseFromString(temp, 'text/html');

// console.log(temp);



const shortStoryData = require('./short-stories.json');

// console.log(Object.keys(shortStoryData));

const stories1 = [shortStoryData.Fantasy, shortStoryData.Mystery, shortStoryData.Horror, shortStoryData.Philosophy].flat();

const findDuplicates = (array) => {
    return array.filter((element, index) => array.indexOf(element) !== index);
};

console.log(findDuplicates(stories1.map(s => s.Author)));




// console.log(shortStoryData);

// console.log(shortStoryData.Fantasy[0].Content);