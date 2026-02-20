import {select} from "@inquirer/prompts"
import {getAllNodeTypes} from "../../tests/_toolbox/getAllNodeTypes"
import type {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"

export async function getStartNodeType(override: string | undefined) {
    if (override && override !== "") {
        return override as Neo4jNodeType
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
