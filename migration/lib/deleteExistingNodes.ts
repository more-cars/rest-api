import {confirm} from "@inquirer/prompts"

export async function deleteExistingNodes(override: string | undefined) {
    if (override && override !== "") {
        return override === 'true'
    }

    return confirm({
        message: 'Should all existing nodes of the selected type be DELETED from the target database before migration?',
        default: true,
    })
}
