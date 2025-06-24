import {BaseRelationship} from "../../../../src/db/types/BaseRelationship"
import {seedRelationship} from "./seedRelationship"

export async function seedRelationships(amount: number) {
    const relationships: Array<BaseRelationship> = []

    for (let i = 0; i < amount; i++) {
        relationships.push(await seedRelationship())
    }

    return relationships
}
