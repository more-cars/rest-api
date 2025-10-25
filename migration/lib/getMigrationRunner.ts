import {select} from "@inquirer/prompts"

export async function getMigrationRunner(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return select({
        message: 'Which migration runner should be used?',
        default: 'local',
        choices: [
            {
                value: 'local',
            },
            {
                value: 'minikube',
            },
            {
                value: 'gke',
            },
        ],
    })
}
