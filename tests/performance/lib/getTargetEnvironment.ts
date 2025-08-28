import {select} from "@inquirer/prompts"

export async function getTargetEnvironment() {
    const selection = await select({
        message: 'Against which environment should the performance tests be run?',
        default: 'local',
        choices: [
            {
                value: 'local',
            },
            {
                value: 'minikube-dev',
            },
            {
                value: 'minikube-testing',
            },
            {
                value: 'minikube-prod',
            },
            {
                value: 'testing',
            },
            {
                value: 'prod',
                disabled: true,
            },
        ],
    })

    return selection
}
