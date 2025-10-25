import {input} from "@inquirer/prompts"

export function getSourceDb(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return input({
        message: 'Migrating data from which database?',
        default: 'mc1db.more-cars.internal',
    })
}
