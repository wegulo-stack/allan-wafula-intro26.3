// Create a footer element with a copyright notice and append it to the body of the document
const body = document.querySelector("body");
const footerElement = document.createElement("footer");
body.appendChild(footerElement);
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; Allan Wafula ${thisYear}`;
footer.appendChild(copyright);

// Create an array list of skills and append them to the Skills section of the document
let skills = ["HTML", "CSS", "JavaScript", "Adobe Illustrator", "GitHub"];
let skillsSection = document.querySelector("#Skills");
let skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}

// Add an event listener to the leave message form that prevents the default form submission
// behavior. Instead it retrieves the user's name, email, and message from the form inputs 
// and creates a new list item with the user's name and message, and appends it to 
// the messages list. Also adds a remove button to each message that allows the user to
// remove the message from the list.
let messageForm = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let usersName = event.target.usersName.value;
    let usersEmail = event.target.usersEmail.value;
    let usersMessage = event.target.usersMessage.value;
    console.log(usersName, usersEmail, usersMessage);

    let messageSection = document.querySelector("#messages");
    let messageList = messageSection.querySelector("ul");
    let newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> <span>${usersMessage}</span>`;
    
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", function() {
        let entry = removeButton.parentNode;
        entry.remove();
    });
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    event.target.reset();    
});

// Fetch the list of my repositories using the GitHub API and append them to the Projects section of the document
let projectSection = document.querySelector("#Projects");
let projectList = projectSection.querySelector("ul");
fetch("https://api.github.com/users/wegulo-stack/repos")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error fetching repositories");
        }
        return response.json();
    })
    .then(repositories => {
        console.log(repositories);
        for(let i = 0; i <repositories.length; i++) {
            let project = document.createElement("li");
            project.innerHTML = repositories[i].name;
            projectList.appendChild(project);
        }
    })
    .catch(error => {
        console.log(error.message);
    })
