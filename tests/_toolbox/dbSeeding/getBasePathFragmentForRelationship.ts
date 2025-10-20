import type {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import {dasherize} from "inflection"

// TODO mapping doesn't work when there exist different relationships between the same nodes
export function getBasePathFragmentForRelationship(startNodeType: NodeTypeEnum, endNodeType: NodeTypeEnum) {
    const relationships = new Map<string, Map<string, string>>()

    relationships.set(
        'brand', new Map([
            ['car model', 'has car model'],
            ['image', 'has image'],
        ]))

    relationships.set(
        'car model', new Map([
            ['brand', 'belongs to brand'],
            ['image', 'has image'],
        ]))

    relationships.set(
        'image', new Map([
            ['brand', 'belongs to node'],
            ['car model', 'belongs to node'],
        ]))

    const match = relationships.get(startNodeType)?.get(endNodeType)

    if (!match) {
        throw new Error('Relationship not found')
    }

    return dasherize(match)
}
