const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const managerPrompt = require('./lib/prompts/managerPrompt');
const engineerPrompt = require('./lib/prompts/engineerPrompt');
const internPrompt = require('./lib/prompts/internPrompt')

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { TestScheduler } = require("rxjs/testing");
const { getEnvironmentData } = require("worker_threads");
const { get } = require("http");

const team = []
// TODO: Write Code to gather information about the development team members, and render the HTML file.
const addMenu = {
    name: 'nextEmployee',
    message: 'Add another employee?',
    type: 'list',
    choices: ['Add engineer', 'Add intern', 'Finish building team']
}
function getManData() {
    inquirer.prompt(managerPrompt).then((mData) => {
        const manager = new Manager(mData.name, mData.ID, mData.email, mData.officeNumber)
        team.push(manager)
        menu()

    })
}
function menu() {
    inquirer.prompt(addMenu).then((menuData) => {
        if (menuData.nextEmployee === 'Add engineer') {
            getEngData()
        }
        if (menuData.nextEmployee === 'Add intern') {
            getIntData()
        }
        if (menuData.nextEmployee === 'Finish building team') {
            
            fs.writeFile(outputPath, render(team), err => {if (err) throw err})
            
            
        }
    })
}
function getEngData() {
    inquirer.prompt(engineerPrompt).then((engData) => {
        const engineer = new Engineer(engData.name, engData.ID, engData.email, engData.github);
        team.push(engineer)
        menu()
    })
}
function getIntData() {
    inquirer.prompt(internPrompt).then((intData => {
        const intern = new Intern(intData.name, intData.ID, intData.email, intData.school);
        team.push(intern)
        menu()
    }))
}
getManData()