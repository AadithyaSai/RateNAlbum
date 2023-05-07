/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/testapi.js":
/*!************************!*\
  !*** ./src/testapi.js ***!
  \************************/
/***/ (() => {

eval("async function newSpotifyToken() {\n\n  const url = 'https://accounts.spotify.com/api/token';\n  let response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Authorization': 'Basic ' + (btoa(\"957dadb32039470c8913e98ed6e8c0ae\" + ':' + \"713e0a6920894923919bea42e4701ecd\")),\n      'Content-Type': 'application/x-www-form-urlencoded'\n    },\n    body: 'grant_type=client_credentials',\n    json: true\n  });\n\n  if (response.ok) {\n    const jsonResponse = await response.json();\n    return jsonResponse.access_token;\n  } else {\n    console.log(response.statusText);\n    throw new Error(`Request failed! Status code: ${response.status} ${response.statusText}`);\n  }\n}\n\nasync function fetchResult(url, token) {\n  if (!token) {\n    token = await newSpotifyToken();\n  }\n\n  let response = await fetch(url, {\n    method: 'GET',\n    headers: {\n      'Authorization': 'Bearer ' + token,\n    },\n    json: true\n  });\n\n  if (response.error) {\n    token = await newSpotifyToken();\n    return fetchResult(url, token);\n  }\n\n  return await response.json();\n}\n\nasync function getAlbumDeets() {\n  const url = 'https://api.spotify.com/v1/albums/5XpEKORZ4y6OrCZSKsi46A';\n\n  const albumResult = await fetchResult(url);\n  const token = albumResult.token;\n\n  document.getElementById(\"album-cover\").src = albumResult.images[0].url;\n  document.getElementById(\"album-name\").innerHTML = \"<h3>\" + albumResult.name + \"</h3>\";\n  document.getElementById(\"album-url\").href = albumResult.external_urls.spotify;\n  document.getElementById(\"artist\").innerText += albumResult.artists\n                                                  .map(x => x.name)\n                                                  .join(\", \");\n  document.getElementById(\"year\").innerText += albumResult.release_date;\n  document.getElementById(\"genre\").innerText += albumResult.genres.join(\", \") || \"Unknown\";\n\n  const deetsResult = await fetchResult(url + '/tracks', token);\n\n  const trackTable = document.getElementById('track-table');\n\n  let i = 1;\n  deetsResult.items.forEach(element => {\n    let newRow = trackTable.insertRow(-1);\n\n    let rowContent = `<td> ${element.name} </td> <td> <input type=\"text\" id=track${i++} > <td>`;\n    newRow.innerHTML = rowContent;\n  });\n}\n\ngetAlbumDeets();\n\n\n//# sourceURL=webpack://rate-n-album/./src/testapi.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/testapi.js"]();
/******/ 	
/******/ })()
;