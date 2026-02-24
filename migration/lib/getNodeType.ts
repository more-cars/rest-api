import {getAllDbNodeTypes} from "../../tests/_toolbox/getAllDbNodeTypes"
import {select} from "@inquirer/prompts"

export async function getNodeType(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const choices = getAllDbNodeTypes()

    const nodeType = await select({
        message: 'Migrating all nodes of which type?',
        choices,
    })

    return nodeType as string
}
