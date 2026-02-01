import {select} from "@inquirer/prompts"

export function getSourceDb(migrationRunner: string, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    if (migrationRunner !== 'local') {
        return 'API_MC1_DB_SERVICE_SERVICE_HOST'
    }

    return promptUser()
}

async function promptUser() {
    const choices = []

    choices.push(
        {value: 'mc1db.more-cars.internal'},
        {value: 'mc1db.dev.more-cars.internal'},
        {value: 'mc1db.testing.more-cars.internal'},
        {value: 'mc1db.prod.more-cars.internal'},
        {value: 'mc1db.testing.fast-cars.info'},
        {value: 'mc1db.prod.fast-cars.info'},
    )

    return select({
        message: 'Which database should be used to migrate from?',
        choices,
        default: 'localhost',
    })
}