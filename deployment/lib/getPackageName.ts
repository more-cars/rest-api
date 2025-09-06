import {select} from "@inquirer/prompts"

export async function getPackageName(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return await promptUser()
}

async function promptUser() {
    return select({
        message: 'Which package should be deployed?',
        default: 'rest-api',
        choices: [
            {
                value: 'rest-api',
            },
            {
                value: 'rest-api-rc',
            },
        ],
    })
}
