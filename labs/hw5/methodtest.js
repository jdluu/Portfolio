// Add Constants
const form = document.querySelector("#articleForm");
const postBtn = document.querySelector("#postBtn");
const getBtn = document.querySelector("#getBtn");
const putBtn = document.querySelector("#putBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const xmlHTTP = document.querySelector("#xmlHTTP");
const fetchAPI = document.querySelector("#fetchAPI");
const response = document.querySelector("#response");

// Get Date and Time
function getDate() {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let meridiem = hour >= 12 ? "pm" : "am";
	hour = hour % 12 || 12;
	let dateTime = `${month}/${day}/${year} ${hour}:${minute
		.toString()
		.padStart(2, "0")} ${meridiem}`;
	return dateTime;
}

// Auto-fill the Date and Time when the page loads
document.getElementById("date").value = getDate();

// Add Event Listeners
postBtn.addEventListener("click", postArticle);
getBtn.addEventListener("click", getArticle);
putBtn.addEventListener("click", putArticle);
deleteBtn.addEventListener("click", deleteArticle);

// Post Article
function postArticle() {
	const url = "https://httpbin.org/post";
	let id = form.id.value;
	let name = form.article_name.value;
	let body = form.article_body.Value;
	let date = getDate();
	let article = {
		id: id,
		name: name,
		body: body,
		date: date,
	};
	if (xmlHTTP.checked) {
		postArticleXML(article, url);
	} else if (fetchAPI.checked) {
		postArticleFetch(article, url);
	}
}

// Post Article with XML
function postArticleXML(article, url) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onload = function () {
		if (this.status === 200) {
			// Format the JSON response into HTML
			response.innerHTML = `
			<h3> Posted with XHR! </h3>
			<h3>Article ID: ${article.id}</h3>
			<h3>Article Name: ${article.name}</h3>
			<h3>Article Body: ${document.getElementById("article_body").value}</h3>
			<h3>Article Date: ${article.date}</h3>
			`;
		}
	};
	xhr.send(JSON.stringify(article));
}

// Post Article with Fetch
function postArticleFetch(article, url) {
	fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(article),
	})
		.then((response) => response.json())
		.then((data) => {
			try {
				const article = JSON.parse(data.data);
				response.innerHTML = `
				<h3> Posted with Fetch! </h3>
			  <h3>Article ID: ${article.id}</h3>
			  <h3>Article Name: ${article.name}</h3>
			  <h3>Article Body: ${document.getElementById("article_body").value}</h3>
			  <h3>Article Date: ${article.date}</h3>
			`;
			} catch (error) {
				console.error("Error parsing JSON:", error);
			}
		})
		.catch((err) => console.log(err));
}

// Get Article
function getArticle() {
	const url = "https://httpbin.org/get";
	if (xmlHTTP.checked) {
		getArticleXML(url);
	} else if (fetchAPI.checked) {
		getArticleFetch(url);
	}
}

// Get Article with XML
function getArticleXML(url) {
	return new Promise((resolve, reject) => {
		// Get the query string parameters from the form
		const form = document.querySelector("form");
		const formData = new FormData(form);
		const queryString = new URLSearchParams(formData).toString();

		// Append the query string to the URL
		const urlWithQueryString = url + "?" + queryString;

		// Create a new XHR object
		const xhr = new XMLHttpRequest();

		// Set up the XHR request
		xhr.open("GET", urlWithQueryString);
		xhr.responseType = "document";

		// Handle XHR events
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.responseXML);

				response.innerHTML = `
				<h3> Got from XHR! </h3>
				<h3>URL: ${urlWithQueryString}</h3>
				`;
			} else {
				reject(new Error("XHR request failed"));
				console.log("Error: " + xhr.statusText);
			}
		};
		xhr.onerror = () => {
			reject(new Error("XHR request failed"));
			console.log("Error: " + xhr.statusText);
		};

		// Send the XHR request
		xhr.send();
	});
}

function getArticleFetch(url) {
	// Get the query string parameters from the form
	const form = document.querySelector("form");
	const formData = new FormData(form);
	const queryString = new URLSearchParams(formData).toString();

	// Append the query string to the URL
	const urlWithQueryString = url + "?" + queryString;

	// Perform the GET request using the fetch API
	return fetch(urlWithQueryString)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network Error!");
			}
			return response.text();
		})
		.then((xmlText) => {
			// Set innerHTML of response to the url
			response.innerHTML = `
		<h3> Got from Fetch! </h3>
		<h3>URL: ${urlWithQueryString}</h3>
		`;

			// Parse the XML text and return the resulting document
			const parser = new DOMParser();
			return parser.parseFromString(xmlText, "application/xml");
		})
		.catch((error) => {
			console.error("Error during fetch operation:", error);
		});
}

// Put Article
function putArticle() {
	const url = "https://httpbin.org/put";
	let id = form.id.value;
	let name = form.article_name.value;
	let body = form.article_body.value;
	let date = getDate();
	let article = {
		id: id,
		name: name,
		body: body,
		date: date,
	};
	if (xmlHTTP.checked) {
		putArticleXML(article, url);
	} else if (fetchAPI.checked) {
		putArticleFetch(article, url);
	}
}

// Put Article with XML
function putArticleXML(article, url) {
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onload = function () {
		if (this.status === 200) {
			response.innerHTML = `
			<h3> Put with XHR! </h3>
			<h3>Article ID: ${article.id}</h3>
			<h3>Article Name: ${article.name}</h3>
			<h3>Article Body: ${document.getElementById("article_body").value}</h3>
			<h3>Article Date: ${article.date}</h3>
			`;
		}
	};
	xhr.send(JSON.stringify(article));
}

// Put Article with Fetch
function putArticleFetch(article, url) {
	fetch(url, {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(article),
	})
		.then((response) => response.json())
		.then((data) => {
			try {
				const article = JSON.parse(data.data);
				response.innerHTML = `
				<h3> Put with Fetch! </h3>
			  <h3>Article ID: ${article.id}</h3>
			  <h3>Article Name: ${article.name}</h3>
			  <h3>Article Body: ${document.getElementById("article_body").value}</h3>
			  <h3>Article Date: ${article.date}</h3>
			`;
			} catch (error) {
				console.error("Error parsing JSON:", error);
			}
		})
		.catch((err) => console.log(err));
}

// Delete Article
function deleteArticle() {
	const url = "https://httpbin.org/delete";
	if (xmlHTTP.checked) {
		deleteArticleXML(url);
	} else if (fetchAPI.checked) {
		deleteArticleFetch(url);
	}
}

// Delete Article with XML
function deleteArticleXML(url) {
	return new Promise((resolve, reject) => {
		// Get the query string parameters from the form
		const form = document.querySelector("form");
		const formData = new FormData(form);
		const queryString = new URLSearchParams(formData).toString();

		// Append the query string to the URL
		const urlWithQueryString = url + "?" + queryString;

		// Create a new XHR object
		const xhr = new XMLHttpRequest();

		// Set up the XHR request
		xhr.open("DELETE", urlWithQueryString);

		// Handle XHR events
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.responseXML);

				// Set the innerHTML of the response element
				response.innerHTML = `
			<h3>Deleted using XHR!</h3>
			<h3>URL: ${urlWithQueryString}</h3>
		  `;
			} else {
				reject(new Error("XHR request failed"));
				console.log("Error: " + xhr.statusText);
			}
		};
		xhr.onerror = () => {
			reject(new Error("XHR request failed"));
			console.log("Error: " + xhr.statusText);
		};

		// Send the XHR request
		xhr.send();
	});
}

// Delete Article with Fetch
function deleteArticleFetch(url) {
	// Get the query string parameters from the form
	const form = document.querySelector("form");
	const formData = new FormData(form);
	const queryString = new URLSearchParams(formData).toString();

	// Append the query string to the URL
	const urlWithQueryString = url + "?" + queryString;

	// Perform the DELETE request using the fetch API
	return fetch(urlWithQueryString, {
		method: "DELETE",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network Error!");
			}
			// Return the response as text
			return response.text();
		})
		.then((xmlText) => {
			// Set the innerHTML of the response element
			response.innerHTML = `
		  <h3>Deleted using Fetch!</h3>
		  <h3>URL: ${urlWithQueryString}</h3>
		`;

			// Parse the XML text and return the resulting document
			const parser = new DOMParser();
			return parser.parseFromString(xmlText, "application/xml");
		})
		.catch((error) => {
			console.error("Error during fetch operation:", error);
		});
}
