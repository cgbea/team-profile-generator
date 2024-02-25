const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'manager.name',
        message: 'Please enter the name of the team manager',
    },
    {
        type: 'input',
        name: 'manager.id',
        message: 'Please enter the employee ID of the team manager',
    },
    {
        type: 'input',
        name: 'manager.email',
        message: 'Please enter the email address of the team manager',
    },
    {
        type: 'input',
        name: 'manager.officeNumber',
        message: 'Please enter the office number of the team manager',
    },
    {
        type: 'list',
        name: 'step2',
        message: 'What would you like to do next?',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
    },
    {
        type: 'input',
        name: 'manager-name',
        message: 'Please enter the name of the engineer',
        when: function(answers) {
            return answers. ///////////////////////
        }
    },
    {
        type: 'input',
        name: 'manager-id',
        message: 'Please enter the employee ID of the team manager',
    },
    {
        type: 'input',
        name: 'manager-email',
        message: 'Please enter the email address of the team manager',
    },
    {
        type: 'input',
        name: 'office-no',
        message: 'Please enter the office number of the team manager',
    },

];

// function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(fileName, data);
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            const markdown = generateMarkdown(answers);
            writeToFile("README.md", markdown);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// function call to initialize program
init();