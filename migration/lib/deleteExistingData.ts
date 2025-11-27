import {confirm} from "@inquirer/prompts"

export async function deleteExistingData(override: string | undefined) {
    if (override && override !== "") {
        return override === 'true'
    }

    return confirm({
        message: 'Delete all existing nodes resp. relationships of the selected type from the target database before migration?',
        default: false,
    })
}
