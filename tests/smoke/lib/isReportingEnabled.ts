import {select} from "@inquirer/prompts"

export async function isReportingEnabled(envVarOverride: string | undefined): Promise<boolean> {
    if (envVarOverride === "true") {
        return true
    }

    if (envVarOverride === "false") {
        return false
    }

    return await promptUser()
}

async function promptUser() {
    return select({
        message: 'Should test reports be generated?',
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
