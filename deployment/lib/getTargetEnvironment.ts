import {select} from "@inquirer/prompts"

export async function getTargetEnvironment(override: string | undefined, cluster: string) {
    if (override && override !== "") {
        return override
    }

    return await promptUser(cluster)
}

async function promptUser(cluster: string) {
    const choices = [
        {
            value: 'testing',
        },
        {
            value: 'prod',
        },
    ]

    if (cluster === 'minikube') {
        choices.push({
            value: 'dev',
        })
    }

    return select({
        message: 'In which environment should the app be deployed?',
        default: 'testing',
        choices,
    })
}
