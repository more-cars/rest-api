import fs from "node:fs"
import {input} from "@inquirer/prompts"
import {spawnShellCommand} from "../../code_generator/lib/spawnShellCommand"

runSingleTest().then(() => true)

async function runSingleTest() {
    let lastTestId = ''

    const lastTestIdFilename = __dirname + '/last-id.txt'
    if (fs.existsSync(lastTestIdFilename)) {
        lastTestId = fs.readFileSync(lastTestIdFilename).toString()
    }

    let testId = await input({
        message: 'Scenario ID? (e.g. MCA-727 or 727)',
        default: lastTestId,
    })

    testId = testId.replace('MCA-', '')
    const testKey = 'MCA-' + testId
    fs.writeFileSync(lastTestIdFilename, testKey)

    console.log("Test scenario " + testKey + " started...")

    console.time(testKey)
    await spawnShellCommand(`npx cucumber-js --tags "@TEST_MCA-${testId}" --force-exit`)
    console.timeEnd(testKey)
}
