let propertyData = [];

const url =
  "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "223b499daamshddd36e39bb5b394p16af81jsn51d0e3c81a4d",
    "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    const loadingElement = document.querySelector(".loading"); 
    if (loadingElement) {
      loadingElement.remove();
    }
    propertyData = data.hits;
    renderPropertyCards(propertyData);
  })
  .catch((error) => {
    console.error(error);
    const mainElement = document.querySelector("main");
    mainElement.classList.remove("main");
    mainElement.classList.add("error");

    const errorElement = document.createElement("div");

 
    const errorText = document.createElement("p");
    errorText.textContent =
      "An error occurred while fetching data reload page.";
    errorElement.appendChild(errorText);


    const mainContainer = document.querySelector(".error");
    mainContainer.appendChild(errorElement);
  });

function renderPropertyCards(propertyData) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = ""; 

  propertyData.forEach((property) => {
    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    const imageContainer = document.createElement("span");
    imageContainer.classList.add("image-card");

    const imageElement = document.createElement("img");
    imageElement.src = property.coverPhoto.url; 
    imageElement.alt = property.title; 
    imageContainer.appendChild(imageElement);

    propertyCard.appendChild(imageContainer);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("property-card-details");

    const titleElement = document.createElement("p");
    titleElement.textContent = truncateText(property.title, (maxLength = 40));
    detailsContainer.appendChild(titleElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${property.price.toLocaleString("en-US")}`;
    detailsContainer.appendChild(priceElement);

    const locationElement = document.createElement("p");
    const locations = property.location.map((loc) => loc.name);
    locationElement.textContent = truncateText(locations.join(", "));
    detailsContainer.appendChild(locationElement);

    const detailsButton = document.createElement("button");
    detailsButton.textContent = "View Details";
    detailsContainer.appendChild(detailsButton);

    propertyCard.appendChild(detailsContainer);

    mainElement.appendChild(propertyCard);
  });
}

function truncateText(text, maxLength = 50) {
  if (text.length > maxLength) {
   
    return text.substring(0, maxLength - 3) + "...";
  } else {
    
    return text;
  }
}

const overlay = document.querySelector(".overlay");
const sideBar = document.querySelector("#mobile-nav");
const menu = document.querySelector(".menu");
overlay.addEventListener("click", () => {
  overlay.classList.add("hide");
  sideBar.classList.add("hide");
});
menu.addEventListener("click", () => {
  overlay.classList.remove("hide");
  sideBar.classList.remove("hide");
});
