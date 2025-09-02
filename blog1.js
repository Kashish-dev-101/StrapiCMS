"use-strcit";

const params = new URLSearchParams(window.location.search);
console.log(params);

const id = params.get("id");
console.log(id);

const apiEndpoint = "http://localhost:1337/api";

const imgBanner = document.querySelector("#bannerImg");
console.log(imgBanner);

const postTile = document.querySelector("#postTitle");
console.log(postTile);

const postContent = document.querySelector("#postContent");
console.log(postContent);

const authorAvatar = document.querySelector("#authorAvatar");
console.log(authorAvatar);

const authorName = document.querySelector("#authorName");
console.log(authorName);

const authorBio = document.querySelector("#authorBio");
console.log(authorBio);

const createdAt = document.querySelector("#createdAt");
console.log(createdAt);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const rawResponse = await fetch(`${apiEndpoint}/posts/${id}?populate=*`);
    const response = await rawResponse.json();
    console.log(response);
    console.log(JSON.stringify(response, null, 2)); // to pretty print the JSON response
    console.log(response.data.title);
    console.log(response.data.content);
    console.log(response.data.coverImage.formats.large.url);

    const rawResponseAuthor = await fetch(`${apiEndpoint}/authors?populate=*`);
    const responseAuthor = await rawResponseAuthor.json();
    console.log(responseAuthor);
    console.log(JSON.stringify(responseAuthor, null, 2)); // to pretty print the JSON response
    console.log(responseAuthor.data[0].Name);
    console.log(responseAuthor.data[0].avatar.formats.thumbnail.url);
    console.log(responseAuthor.data[0].Bio);

    // Add data to the elements
    imgBanner.src = `http://localhost:1337${response.data.coverImage.formats.large.url}`;
    postTile.innerHTML = response.data.title;
    postContent.innerHTML = response.data.content;
    authorAvatar.src = `http://localhost:1337${responseAuthor.data[0].avatar.formats.thumbnail.url}`;
    authorName.innerHTML = responseAuthor.data[0].Name;
    authorBio.innerHTML = responseAuthor.data[0].Bio;
    createdAt.innerHTML = new Date(response.data.createdAt).toDateString();
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
