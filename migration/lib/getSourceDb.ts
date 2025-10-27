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
        {value: 'localhost'},
        {value: 'dev.mc1db.more-cars.internal'},
        {value: 'testing.mc1db.more-cars.internal'},
        {value: 'prod.mc1db.more-cars.internal'},
        {value: 'testing.mc1db.fast-cars.info'},
        {value: 'prod.mc1db.fast-cars.info'},
    )

    return select({
        message: 'Which database should be used to migrate from?',
        choices,
        default: 'localhost',
    })
}