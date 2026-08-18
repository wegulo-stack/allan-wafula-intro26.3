const body = document.querySelector("body");
const footerElement = document.createElement("footer");
body.appendChild(footerElement);
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; Allan Wafula ${thisYear}`;
footer.appendChild(copyright);

let skills = ["HTML", "CSS", "JavaScript", "Adobe illustrator", "GitHub"];
let skillsSection = document.querySelector("#Skills");
let skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}