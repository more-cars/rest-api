import {select} from "@inquirer/prompts"

export async function getTargetCluster(testRunner: string, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return await promptUser(testRunner)
}

async function promptUser(testRunner: string) {
    const choices = []

    if (testRunner === 'local') {
        choices.push(
            {value: 'local'},
            {value: 'minikube'},
            {value: 'gke'},
        )
    }

    if (testRunner === 'minikube') {
        choices.push({value: 'minikube'})
    }

    if (testRunner === 'gke') {
        choices.push({value: 'gke'})
    }

    return select({
        message: 'In which cluster should the migration be executed?',
        choices,
    })
}
