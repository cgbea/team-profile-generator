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

const employees = [];

async function assembleTeam() {
    const managerAnswers = await inquirer.prompt([
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

    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    employees.push(manager);

    await gatherTeamMembers();
    const renderedHTML = render(employees);

    fs.writeFileSync(outputPath, renderedHTML);
    console.log("Team HTML file generated successfully!");
}

async function gatherTeamMembers() {
    let addMember = true;
    while (addMember) {
        const { memberType } = await inquirer.prompt({
            type: 'list',
            name: 'memberType',
            message: 'What type of team member would you like to add next?',
            choices: ['Engineer', 'Intern', 'Finish building the team'],
        });

        if (memberType === 'Finish building the team') {
            addMember = false;
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