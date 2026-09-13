const myHeaders = new Headers();
myHeaders.append("x-apisports-key", "5a98dacb76d8a4785fdb22290c31e38b");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const footballContainer = document.querySelector("#Football");
const footballList = footballContainer.querySelector("ul");

const leaguesButton = document.querySelector("#leaguesButton");
const teamsButton = document.querySelector("#teamsButton");

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