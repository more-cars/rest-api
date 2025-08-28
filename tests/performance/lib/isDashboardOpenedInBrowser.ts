import {select} from "@inquirer/prompts"

export async function isDashboardOpenedInBrowser() {
    const selection = await select({
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

    return selection
}
