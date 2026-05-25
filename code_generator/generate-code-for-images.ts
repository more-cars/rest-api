import {input} from "@inquirer/prompts"
import {convertToCliParameters} from "./lib/convertToCliParameters"
import {spawnShellCommand} from "./lib/spawnShellCommand"

promptStartNodeType().then(async (startNodeType) => {
    await generateCodeForHasImageRelationship(startNodeType)
    await generateCodeForHasPrimeImageRelationship(startNodeType)
})

async function promptStartNodeType() {
    return input({
        message: 'Type of the first node?',
    })
}

async function generateCodeForHasImageRelationship(startNodeType: string) {
    const params = {
        startNodeType: startNodeType,
        relationshipName: 'has image',
        endNodeType: 'Image',
        cardinality: 'm:n',
        forwardRelationshipName: 'false',
    }
    const cliParameters = convertToCliParameters(params)

    let hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen relationship create ${cliParameters}`
    console.log(hygenCommand)
    await spawnShellCommand(hygenCommand)

    hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen relationship get-all ${cliParameters}`
    console.log(hygenCommand)
    await spawnShellCommand(hygenCommand)

    hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen relationship delete ${cliParameters}`
    console.log(hygenCommand)
    await spawnShellCommand(hygenCommand)
}

async function generateCodeForHasPrimeImageRelationship(startNodeType: string) {
    const params = {
        startNodeType: startNodeType,
        relationshipName: 'has prime image',
        endNodeType: 'Image',
        cardinality: 'n:1',
        forwardRelationshipName: 'false',
    }
    const cliParameters = convertToCliParameters(params)

    let hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen relationship create ${cliParameters}`
    console.log(hygenCommand)
    await spawnShellCommand(hygenCommand)

    hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen relationship get-sole ${cliParameters}`
    console.log(hygenCommand)
    await spawnShellCommand(hygenCommand)

    hygenCommand = `HYGEN_OVERWRITE=1 HYGEN_TMPLS='${__dirname}' hygen relationship delete ${cliParameters}`
    console.log(hygenCommand)
    await spawnShellCommand(hygenCommand)
}
