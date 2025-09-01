import {select} from "@inquirer/prompts"

export async function getTargetEnvironment(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return await promptUser()
}

async function promptUser() {
    return select({
        message: 'In which environment should the app be deployed?',
        default: 'minikube-testing',
        choices: [
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
                value: 'gke-testing',
            },
            {
                value: 'gke-prod',
            },
        ],
    })
}
