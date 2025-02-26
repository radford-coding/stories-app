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

// temp.forEach(element => {
//     console.log(element.author);
// });

// const writeShortestStories = async () => {
//     try {
//         await fetch('http://localhost:3000/', {
//             method: 'POST',
//             body: JSON.stringify({
//                 name: 'test title',
//                 body: 'test body',
//                 owner: '67be74bc1ab0ecf6383584a0',
//                 author: 'Aesop\'s Fables',
//                 vibes: ['adage', 'fable'],
//             }),
//         });
//     } catch (error) {
//         console.log(error);
//     };
// };

// writeShortestStories();