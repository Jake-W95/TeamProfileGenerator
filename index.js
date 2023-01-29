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


// TODO: Write Code to gather information about the development team members, and render the HTML file.

function getData() {
    const addMenu = {
        name: 'addMenu',
        type: 'list',
        choices: ['Add engineer', 'Add intern', 'Finish building team']
    }
    inquirer.prompt(managerPrompt).then((managerData) => {
        inquirer.prompt(addMenu)
            .then((addChoice) => {
                while (addChoice !== 'Finish buildin team') {
                    if (addChoice === 'Add engineer') {
                        inquirer.prompt(engineerPrompt).then((engineerData) => {
                        })
                        if (addChoice === 'Add intern') {
                            inquirer.prompt(internPrompt)
                        }

                    }


                }
            })
    })
}

getData()