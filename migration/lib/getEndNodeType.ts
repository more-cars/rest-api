import {select} from "@inquirer/prompts"
import {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"
import {getAllPotentialPartnerNodeTypes} from "../src/getAllPotentialPartnerNodeTypes"

export async function getEndNodeType(startNodeType: Neo4jNodeType, override: string | undefined) {
    if (override && override !== "") {
        return override as Neo4jNodeType
    }

    const nodeOptions = getAllPotentialPartnerNodeTypes().get(startNodeType) as Neo4jNodeType[]
    const choices = []

    for (const node of nodeOptions) {
        choices.push({value: node})
    }

    return select({
        message: 'End node type of the relationship?',
        choices,
    })
}
