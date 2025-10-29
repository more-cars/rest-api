import {input} from "@inquirer/prompts"

export async function getTestVersion(testRunner: string, targetCluster: string, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    if (testRunner === 'local') {
        return ''
    }

    return promptUser()
}

async function promptUser() {
    return input({
        message: 'What is the correct test version to match the code version in the system under test? (git hash or docker tag)',
        default: 'latest',
    })
}
