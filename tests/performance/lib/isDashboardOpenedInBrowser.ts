import {select} from "@inquirer/prompts"

export async function isDashboardOpenedInBrowser(testRunner: string, override: string | undefined) {
    if (override === "true") {
        return true
    }

    if (override === "false") {
        return false
    }

    if (testRunner !== "local") {
        return false
    }

    return promptUser()
}

async function promptUser() {
    return select({
        message: 'Automatically open dashboard in browser?',
        default: false,
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
