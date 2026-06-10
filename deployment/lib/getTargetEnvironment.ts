import {select} from "@inquirer/prompts"

export async function getTargetEnvironment(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return promptUser()
}

async function promptUser() {
    const choices = [
        {
            value: 'testing',
        },
        {
            value: 'prod',
        },
    ]

    return select({
        message: 'In which environment should the app be deployed?',
        default: 'testing',
        choices,
    })
}
