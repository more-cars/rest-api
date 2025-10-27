import {select} from "@inquirer/prompts"
import {getAllNodeTypes} from "../../tests/_toolbox/getAllNodeTypes"
import type {NodeTypeLabel} from "../../src/db/NodeTypeLabel"

export async function getStartNodeType(override: string | undefined) {
    if (override && override !== "") {
        return override as NodeTypeLabel
    }

    const nodeOptions = getAllNodeTypes()
    const choices = []

    for (const node of nodeOptions) {
        choices.push({value: node})
    }

    return select({
        message: 'Start node type of the relationship?',
        choices,
    })
}
