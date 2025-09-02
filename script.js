"use-strict";

const postImgElm = document.querySelector("#postCover");
console.log(postImgElm);

const postTileElm = document.querySelector("#postTitle");
console.log(postTileElm);

const avatarImgElm = document.querySelector("#authorAvatar");
console.log(avatarImgElm);

const authotNameElm = document.querySelector("#authorName");
console.log(authotNameElm);

const createdAt = document.querySelector("#createdAt");
console.log(createdAt);

// chosee the main DIV class

const postCard = document.querySelector("#postCard");
console.log(postCard);

const apiEndpoint = "http://localhost:1337/api";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const rawResponse = await fetch(`${apiEndpoint}/posts?populate=*`);
    const response = await rawResponse.json();
    console.log(response);
    console.log(JSON.stringify(response, null, 2)); // to pretty print the JSON response
    console.log(response.data[0].title);
    console.log(response.data[0].coverImage.formats.medium.url);
    //console.log(response.data[0].);

    // Fetching author details

    const rawResponseAuthor = await fetch(`${apiEndpoint}/authors?populate=*`);
    const responseAuthor = await rawResponseAuthor.json();
    console.log(responseAuthor);
    console.log(JSON.stringify(responseAuthor, null, 2)); // to pretty print the JSON response
    console.log(responseAuthor.data[0].Name);
    console.log(responseAuthor.data[0].avatar.formats.thumbnail.url);

    // Adding data to the HTML elements
    postTileElm.innerHTML = response.data[0].title;
    postImgElm.src = `http://localhost:1337${response.data[0].coverImage.formats.medium.url}`;
    authotNameElm.innerHTML = responseAuthor.data[0].Name;
    avatarImgElm.src = `http://localhost:1337${responseAuthor.data[0].avatar.formats.thumbnail.url}`;
    createdAt.innerHTML = new Date(response.data[0].createdAt).toDateString();
    postTileElm.href = `./blog1.html?id=${response.data[0].documentId}`;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
