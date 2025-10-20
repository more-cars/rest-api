import type {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"

export function getTargetNodeTypeForRelationship(startNodeType: NodeTypeEnum, relationshipName: string) {
    const relationships = new Map<string, Map<string, string>>()
    relationshipName = relationshipName.toLowerCase().replaceAll('_', ' ')

    relationships.set(
        'company', new Map([
            ['has brand', 'brand'],
            ['has image', 'image'],
            ['has prime image', 'image'],
        ]))

    relationships.set(
        'brand', new Map([
            ['belongs to company', 'company'],
            ['has car model', 'car model'],
            ['has image', 'image'],
            ['has prime image', 'image'],
        ]))

    relationships.set(
        'car model', new Map([
            ['belongs to brand', 'brand'],
            ['has successor', 'car model'],
            ['has image', 'image'],
            ['has prime image', 'image'],
        ]))

    relationships.set(
        'image', new Map([
            ['belongs to node', 'company'],
            ['belongs to node', 'brand'],
            ['belongs to node', 'car model'],
        ]))

    const match = relationships.get(startNodeType)?.get(relationshipName)

    if (!match) {
        throw new Error('TEST ERROR: No relationship mapping found')
    }

    return match as NodeTypeEnum
}
