import {select} from "@inquirer/prompts"
import {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"
import {getAllRelationshipTypes} from "../src/getAllRelationshipTypes"
import type {RelationshipType} from "../../src/db/types/RelationshipType"

export async function getRelationshipType(startNodeType: Neo4jNodeType, endNodeType: Neo4jNodeType, override: string | undefined) {
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
