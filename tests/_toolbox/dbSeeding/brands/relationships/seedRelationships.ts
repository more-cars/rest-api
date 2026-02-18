import {Relationship} from "../../../../../src/db/types/Relationship"
import {seedRelationship} from "./seedRelationship"

export async function seedRelationships(amount: number) {
    const relationships: Relationship[] = []

    for (let i = 0; i < amount; i++) {
        relationships.push(await seedRelationship())
    }

    return relationships
}
