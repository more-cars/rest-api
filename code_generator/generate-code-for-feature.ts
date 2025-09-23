import {select} from "@inquirer/prompts"
import inquirer from 'inquirer'
import {convertToCliParameters} from "./lib/convertToCliParameters"
import {runShellCommand} from "./lib/runShellCommand"

generateCodeForFeature().then(() => true)

async function generateCodeForFeature() {
    const typeOfData = await promptTypeOfData() as 'node' | 'relationship'
    const typeOfFeature = await promptTypeOfFeature(typeOfData)
    const featureParameters = await promptFeatureParameters(typeOfData, typeOfFeature)
    const cliParameters = convertToCliParameters(featureParameters)
    const hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen ${typeOfData} ${typeOfFeature} ${cliParameters}`
    await runShellCommand(hygenCommand)
}

async function promptTypeOfData() {
    const choices = [
        {value: 'node'},
        {value: 'relationship'},
    ]

    return select({
        message: 'Generating code for which type of data?',
        choices,
    })
}

async function promptTypeOfFeature(typeOfData: 'node' | 'relationship') {
    const choices = []
    switch (typeOfData) {
        case 'node':
            choices.push({value: 'get-by-id'})
            choices.push({value: 'get-all'})
            choices.push({value: 'delete'})
            break
        case 'relationship':
            choices.push({value: 'get-sole'})
            choices.push({value: 'has'})
            break
    }

    return select({
        message: 'Generating code for which feature?',
        choices,
    })
}

async function promptFeatureParameters(typeOfData: string, typeOfFeature: string) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const questions = require(`${__dirname}/${typeOfData}/${typeOfFeature}/prompt.js`)

    return inquirer.prompt(questions)
}
