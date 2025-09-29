import {select} from "@inquirer/prompts"
import {convertToCliParameters} from "../code_generator/lib/convertToCliParameters"
import {runShellCommand} from "../code_generator/lib/runShellCommand"
import inquirer from 'inquirer'
import fs from "node:fs"
import {createTickets} from "./lib/createTickets"

prepareAndCreateTickets().then(() => true)

async function prepareAndCreateTickets() {
    const feature = await promptFeature()
    const featureParameters = await promptFeatureParameters(feature)
    const cliParameters = convertToCliParameters(featureParameters)
    const hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen features ${feature} ${cliParameters}`
    await runShellCommand(hygenCommand)

    const data = JSON.parse(fs.readFileSync(__dirname + '/_temp/ticketTree.json', 'utf8'))
    const createdTickets = await createTickets(data)
    console.log('Tickets created:', createdTickets)
}

async function promptFeature() {
    const choices = [
        {value: 'get-node-by-id'},
        {value: 'get-all-nodes'},
        {value: 'hard-delete-node'},
        {value: 'create-relationship'},
        {value: 'get-all-relationships'},
        {value: 'get-sole-relationship'},
    ]

    return select({
        message: 'Generating tickets for which feature?',
        choices,
    })
}

async function promptFeatureParameters(feature: string) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const questions = require(`${__dirname}/features/${feature}/prompt.js`)

    return inquirer.prompt(questions)
}
