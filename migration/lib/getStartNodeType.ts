import {select} from "@inquirer/prompts"
import {getAllDbNodeTypes} from "../../tests/_toolbox/getAllDbNodeTypes"
import type {DbNodeType} from "../../src/db/types/DbNodeType"

export async function getStartNodeType(override: string | undefined) {
    if (override && override !== "") {
        return override as DbNodeType
    }

    const nodeOptions = getAllDbNodeTypes()
    const choices = []

    for (const node of nodeOptions) {
        choices.push({value: node})
    }

    return select({
        message: 'Start node type of the relationship?',
        choices,
    })
}
