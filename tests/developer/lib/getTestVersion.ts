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
        message: 'Against which version of the API should the tests be run (e.g. 0.27.0)? (git hash or docker tag)',
        default: 'latest',
    })
}
