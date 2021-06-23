﻿// NEVER use these directly!
// ALWAYS inject them into localStorage so that
// they interpolate with users' recipes.
// Only inject when the item in localstorage is null
//
// Local storage codename: 'recipes'
// localStorage.getItem('recipes');
// localStorage.setItem('recipes', updatedRecipes);
//
// Fields:
// id - to access recipe details via URL
// category - category id
// title - title
// desc - preparation instructions
// difficulty - number 1-5
// preptime - in minutes
// ratings - array of numbers 1-5
// videos - array of YouTube video links
// pictures - array of picture links
// comments - array of {username: String, comment: String}

const defaultRecipes = [
    {
        id: 1,
        category: 2,
        title: 'Sarme',
        desc: 'Staviti sarmu u lonac',
        difficulty: 2,
        preptime: 150,
        ratings: [5, 5, 2, 3, 5, 4, 5],
        videos: ['https://www.youtube.com/watch?v=ewXhHgESReQ', 'https://www.youtube.com/watch?v=SGswt_asbzE'],
        pictures: ['https://podravkaiovariations.azureedge.net/4bb6d842-631f-11eb-8162-0242ac12001a/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp', 'https://d1uz88p17r663j.cloudfront.net/resized/6b1bb1bc21da019356b0ffde7f979c2a_Doma%C4%87a_Sarma_iStock-535515436_1500_700.jpg'],
        comments: [
            { username: 'Viktor', comment: 'Ja volim sarme' },
            { username: 'Dragan', comment: 'Njam njam' },
        ]
    },
    {
        id: 2,
        category: 2,
        title: 'Kaneloni sa pesto sosom',
        desc: 'Ukaneloniti kanelone i onda ih zakaneloniti od gore kaneloninjima i onda ih tako iskanelonirane poslužiti na kaneloslužavniku.',
        difficulty: 5,
        preptime: 75,
        ratings: [4, 2, 2, 3, 1, 4, 3],
        videos: [],
        pictures: [],
        comments: [
            { username: 'Viktor', comment: 'Manje začina valja...' },
            { username: 'Dragan', comment: 'Njam njam' },
        ]
    },
    {
        id: 3,
        category: 2,
        title: 'Losos na žarku',
        desc: 'Užariti lososa i staviti ga na tiganj. I posle poslužiti.',
        difficulty: 4,
        preptime: 45,
        ratings: [4, 2, 2, 3, 1, 4, 3],
        videos: [],
        pictures: [],
        comments: [
            { username: 'Žarko', comment: 'Nisam ljubitelj ovoga.' },
            { username: 'Dragan', comment: 'Njam njam' },
        ]
    },
];

export default defaultRecipes;