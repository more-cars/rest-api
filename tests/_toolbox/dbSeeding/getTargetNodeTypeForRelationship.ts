import type {NodeType} from "../NodeType"

export function getTargetNodeTypeForRelationship(startNodeType: NodeType, relationshipName: string) {
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
            ['has car model', 'car model'],
            ['has image', 'image'],
            ['has prime image', 'image'],
        ]))

    relationships.set(
        'car model', new Map([
            ['belongs to brand', 'brand'],
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
        throw new Error('Relationship not found')
    }

    return match as NodeType
}
