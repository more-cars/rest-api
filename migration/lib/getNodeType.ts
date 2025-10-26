import {getAllNodeTypes} from "../../tests/_toolbox/getAllNodeTypes"
import {select} from "@inquirer/prompts"

export async function getNodeType(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const choices = getAllNodeTypes()

    const nodeType = await select({
        message: 'Migrating all nodes of which type?',
        choices,
    })

    return nodeType as string
}
