import {select} from "@inquirer/prompts"

export async function getDataType(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return select({
        message: 'Which kind of data should be migrated?',
        default: 'nodes',
        choices: [
            {
                value: 'nodes',
            },
            {
                value: 'relationships',
            },
        ],
    })
}
