import {select} from "@inquirer/prompts"
import {promisify} from 'util'
import {exec} from 'child_process'
import inquirer from 'inquirer'
import fs from "node:fs"
import {createTickets} from "./lib/createTickets"

prepareAndCreateTickets().then(r => true)

async function prepareAndCreateTickets() {
    const selectedFeature = await selectFeature()
    const parameters = await configureParameters(selectedFeature)
    const cliParameters = convertToCliParameters(parameters)
    const hygenCommand = 'HYGEN_OVERWRITE=1 HYGEN_TMPLS=' + __dirname + '/../../../code_generator hygen tickets ' + selectedFeature + ' ' + cliParameters
    await runCommand(hygenCommand) // produces a file `ticketTree.json` in this folder

    const data = JSON.parse(fs.readFileSync(__dirname + '/ticketTree.json', 'utf8'))
    const createdTickets = await createTickets(data)
    console.log('Tickets created:', createdTickets)
}

async function selectFeature() {
    const choices = [
        {value: 'get-node-by-id'},
        {value: 'get-all-nodes'},
        {value: 'hard-delete-node'},
    ]

    return select({
        message: 'Generating tickets for which feature?',
        choices,
    })
}

async function configureParameters(selectedFeature: string) {
    const questions = require(__dirname + '/../../../code_generator/tickets/' + selectedFeature + '/prompt.js')

    return inquirer.prompt(questions)
}

function convertToCliParameters(parameters: any) {
    const cliParams = []

    for (const param in parameters) {
        cliParams.push(`--${param}='${parameters[param]}'`)
    }

    return cliParams.join(' ')
}

async function runCommand(command: string): Promise<string> {
    const execute = promisify(exec)
    try {
        const {stdout, stderr} = await execute(command)
        if (stderr) {
            console.error(`Error: ${stderr}`)
        }
        return stdout
    } catch (error) {
        console.error(`Command failed: ${error}`)
        throw error
    }
}
