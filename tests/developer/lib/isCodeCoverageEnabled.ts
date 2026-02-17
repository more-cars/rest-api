import {select} from "@inquirer/prompts"

export async function isCodeCoverageEnabled(override: string | undefined): Promise<boolean> {
    if (override === "true") {
        return true
    }

    if (override === "false") {
        return false
    }

    return promptUser()
}

async function promptUser() {
    return select({
        message: 'Should a code coverage report be generated?',
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
