import {select} from "@inquirer/prompts"
import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {getAllRelationshipTypes} from "../src/getAllRelationshipTypes"
import type {RelationshipType} from "../../src/db/types/RelationshipType"

export async function getRelationshipType(startNodeType: NodeTypeLabel, endNodeType: NodeTypeLabel, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const relationshipOptions = getAllRelationshipTypes().get(startNodeType)?.get(endNodeType) as RelationshipType[]
    const choices = []

    for (const relationship of relationshipOptions) {
        choices.push({value: relationship})
    }

    return select({
        message: 'Migrating all relationships of which type?',
        choices,
    })
}
