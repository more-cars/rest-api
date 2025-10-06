import {input} from "@inquirer/prompts"
import {spawnShellCommand} from "../../code_generator/lib/spawnShellCommand"

runSingleTest().then(() => true)

async function runSingleTest() {
    let testId = await input({
        message: 'Scenario ID? (e.g. MCA-727 or 727)',
    })

    testId = testId.replace('MCA-', '')

    console.log("Test scenario MCA-" + testId + " started...")

    await spawnShellCommand(`npx cucumber-js --tags "@TEST_MCA-${testId}"`)
}
