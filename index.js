const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// Code to gather information about the development team members, and render the HTML file.

//empty array for the employee objects generated from inquirer prompts.
const employees = [];

//start by asking the manager details, followed by optional other employees.
async function assembleTeam() {
    const manager = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of the team manager',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the employee ID of the team manager',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email address of the team manager',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter the office number of the team manager',
        }
    ]);

    const newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber);
    employees.push(newManager);

    await otherEmployees();

    //pass the employee object values to the page template using render.
    const renderedHTML = render(employees);

    //create the HTML using the file paths defined in the constants at the start of this js file.
    fs.writeFileSync(outputPath, renderedHTML);
}

//prompt for and create other employees according to user choices
async function otherEmployees() {
    let addEmployee = true;
    while (addEmployee) {
        const { memberType } = await inquirer.prompt({
            type: 'list',
            name: 'memberType',
            message: 'What type of team member would you like to add next?',
            choices: ['Engineer', 'Intern', 'Finish building the team'],
        });

        if (memberType === 'Finish building the team') {
            addEmployee = false;
            break;
        }

        if (memberType === 'Engineer') {
            const engineer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter the name of the engineer',
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please enter the employee ID of the engineer',
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Please enter the email address of the engineer',
                },
                {
                    type: 'input',
                    name: 'github',
                    message: 'Please enter the GitHub username of the engineer',
                }
            ]);

            const newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
            employees.push(newEngineer);
        }

        if (memberType === 'Intern') {
            const intern = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter the name of the intern',
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please enter the employee ID of the intern',
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Please enter the email address of the intern',
                },
                {
                    type: 'input',
                    name: 'school',
                    message: 'Please enter the name of the school where the intern attends',
                }
            ]);

            const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school);
            employees.push(newIntern);
        }
    }
}

assembleTeam();