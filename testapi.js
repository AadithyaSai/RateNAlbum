import { config } from "./node_modules/dotenv";
config();

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

async function newSpotifyToken() {

  const url = 'https://accounts.spotify.com/api/token';
  response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials',
    json: true
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse.access_token;
  } else {
    console.log(response.statusText);
    throw new Error(`Request failed! Status code: ${response.status} ${response.statusText}`);
  }
}

async function fetchResult(url, token) {
  if (!token) {
    token = await newSpotifyToken();
  }

  response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    json: true
  });

  if (response.error) {
    token = await newSpotifyToken();
    return fetchResult(url, token);
  }

  return await response.json();
}

async function getAlbumDeets() {
  const url = 'https://api.spotify.com/v1/albums/5XpEKORZ4y6OrCZSKsi46A';

  const albumResult = await fetchResult(url);
  const token = albumResult.token;

  document.getElementById("album-cover").src = albumResult.images[0].url;
  document.getElementById("album-name").innerHTML = "<h3>" + albumResult.name + "</h3>";
  document.getElementById("album-url").href = albumResult.external_urls.spotify;
  document.getElementById("artist").innerText += albumResult.artists
                                                  .map(x => x.name)
                                                  .join(", ");
  document.getElementById("year").innerText += albumResult.release_date;
  document.getElementById("genre").innerText += albumResult.genres.join(", ") || "Unknown";

  const deetsResult = await fetchResult(url + '/tracks', token);

  const trackTable = document.getElementById('track-table');

  let i = 1;
  deetsResult.items.forEach(element => {
    let newRow = trackTable.insertRow(-1);

    rowContent = `<td> ${element.name} </td> <td> <input type="text" id=track${i++} > <td>`;
    newRow.innerHTML = rowContent;
  });
}

getAlbumDeets();
