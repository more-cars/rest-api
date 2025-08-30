import {select} from "@inquirer/prompts"

export async function isReportEnabled(override: string | undefined) {
    if (override === "true") {
        return true
    }

    if (override === "false") {
        return false
    }

    return await promptUser()
}

async function promptUser() {
    return select({
        message: 'Enable reporting?',
        default: true,
        choices: [
            {
                value: true,
            },
            {
                value: false,
            },
        ],
    })
}
