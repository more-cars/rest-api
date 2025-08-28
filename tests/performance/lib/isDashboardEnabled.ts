import {select} from "@inquirer/prompts"

export async function isDashboardEnabled() {
    const selection = await select({
        message: 'Enable dashboard?',
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

    return selection
}
