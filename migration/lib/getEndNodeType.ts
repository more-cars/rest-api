import {select} from "@inquirer/prompts"
import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {getAllPotentialPartnerNodeTypes} from "../src/getAllPotentialPartnerNodeTypes"

export async function getEndNodeType(startNodeType: NodeTypeLabel, override: string | undefined) {
    if (override && override !== "") {
        return override as NodeTypeLabel
    }

    const nodeOptions = getAllPotentialPartnerNodeTypes().get(startNodeType) as NodeTypeLabel[]
    const choices = []

    for (const node of nodeOptions) {
        choices.push({value: node})
    }

    return select({
        message: 'End node type of the relationship?',
        choices,
    })
}
