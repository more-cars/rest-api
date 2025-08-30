import {select} from "@inquirer/prompts"

export async function getTestRunner(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const selection = await select({
        message: 'Which test runner should be used?',
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
                disabled: true,
            },
        ],
    })

    return selection
}
