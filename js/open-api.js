// Create a Headers object to include the API key needed for the request
const myHeaders = new Headers();
myHeaders.append("x-apisports-key", "5a98dacb76d8a4785fdb22290c31e38b");

// Set options for the GET request
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// Select the Football section and list elements for displaying API results
const footballContainer = document.querySelector("#Football");
const footballList = footballContainer.querySelector("ul");

// Select the buttons for fetching leagues and teams
const leaguesButton = document.querySelector("#leaguesButton");
const teamsButton = document.querySelector("#teamsButton");

// Add event listener for when the leagues button is clicked to fetch and display leagues
leaguesButton.addEventListener("click", function () {

    fetch("https://v3.football.api-sports.io/leagues", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching leagues!");
            }

            return response.json();
        })

        .then(leagues => {

            console.log(leagues);

            footballList.innerHTML = "";

            for (let i = 0; i < leagues.response.length; i++) {

                let leagueName = leagues.response[i].league.name;
                let leagueLogo = leagues.response[i].league.logo;
                let country = leagues.response[i].country.name;

                let league = document.createElement("li");

                league.innerHTML = `
                    <h2>${leagueName}</h2>
                    <div class="leagueImage">
                        <img src="${leagueLogo}" alt="${leagueName}">
                    </div>
                    <div class="leagueDescription">
                        <p>${country}</p>
                    </div>
                `;

                footballList.appendChild(league);
            }

        })

        .catch(error => {
            console.error(error.message);
        });
});

// Add event listener for when the teams button is clicked to fetch and display teams
teamsButton.addEventListener("click", function () {

    fetch("https://v3.football.api-sports.io/teams?league=39&season=2024", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching teams!");
            }

            return response.json();
        })

        .then(teams => {

            console.log(teams);

            footballList.innerHTML = "";

            for (let i = 0; i < teams.response.length; i++) {

                let teamName = teams.response[i].team.name;
                let teamLogo = teams.response[i].team.logo;
                let founded = teams.response[i].team.founded;

                let team = document.createElement("li");

                team.innerHTML = `
                    <h2>${teamName}</h2>
                    <div class="teamImage">
                        <img src="${teamLogo}" alt="${teamName}">
                    </div>
                    <div class="teamDescription">
                        <p>Founded: ${founded}</p>
                    </div>
                `;

                footballList.appendChild(team);
            }

        })

        .catch(error => {
            console.error(error.message);
        });
});

// Create a footer element with a copyright notice and append it to the body
const body = document.querySelector("body");
const footerElement = document.createElement("footer");
body.appendChild(footerElement);
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; Allan Wafula ${thisYear}`;
footer.appendChild(copyright);