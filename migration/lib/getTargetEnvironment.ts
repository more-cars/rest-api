import {select} from "@inquirer/prompts"

export async function getTargetEnvironment(targetCluster: string, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return await promptUser(targetCluster)
}

async function promptUser(targetCluster: string) {
    const choices = []

    if (targetCluster === 'local') {
        choices.push(
            {value: 'local'},
        )
    }

    if (targetCluster === 'minikube') {
        choices.push(
            {value: 'dev'},
            {value: 'testing'},
            {value: 'prod'},
        )
    }

    if (targetCluster === 'gke') {
        choices.push(
            {value: 'testing'},
            {value: 'prod'},
        )
    }

    return select({
        message: 'In which environment should the migration be run?',
        choices,
    })
}
