import {input} from "@inquirer/prompts"

export async function getTargetVersion(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return await promptUser()
}

async function promptUser() {
    return input({
        message: 'Which version of the app should be deployed?',
        default: 'latest',
    })
}
