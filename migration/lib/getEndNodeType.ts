import {select} from "@inquirer/prompts"
import {DbNodeType} from "../../src/db/types/DbNodeType"
import {getAllPotentialPartnerNodeTypes} from "../src/getAllPotentialPartnerNodeTypes"

export async function getEndNodeType(startNodeType: DbNodeType, override: string | undefined) {
    if (override && override !== "") {
        return override as DbNodeType
    }

    const nodeOptions = getAllPotentialPartnerNodeTypes().get(startNodeType) as DbNodeType[]
    const choices = []

    for (const node of nodeOptions) {
        choices.push({value: node})
    }

    return select({
        message: 'End node type of the relationship?',
        choices,
    })
}
