import {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"

export function getTargetNodeTypeForRelationship(startNodeType: NodeTypeEnum, relationshipName: string) {
    const relationships = new Map<string, Map<string, string>>()
    relationshipName = relationshipName.toLowerCase().replaceAll('_', ' ')

    relationships.set(
        NodeTypeEnum.COMPANY, new Map([
            ['has brand', NodeTypeEnum.BRAND],
            ['has image', NodeTypeEnum.IMAGE],
            ['has prime image', NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.BRAND, new Map([
            ['belongs to company', NodeTypeEnum.COMPANY],
            ['has car model', NodeTypeEnum.CAR_MODEL],
            ['has image', NodeTypeEnum.IMAGE],
            ['has prime image', NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.CAR_MODEL, new Map([
            ['belongs to brand', NodeTypeEnum.BRAND],
            ['has successor', NodeTypeEnum.CAR_MODEL],
            ['has image', NodeTypeEnum.IMAGE],
            ['has prime image', NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACE_TRACK, new Map([
            ['has layout', NodeTypeEnum.TRACK_LAYOUT],
            ['has image', NodeTypeEnum.IMAGE],
            ['has prime image', NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.TRACK_LAYOUT, new Map([
            ['belongs to race track', NodeTypeEnum.RACE_TRACK],
            ['has image', NodeTypeEnum.IMAGE],
            ['has prime image', NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.IMAGE, new Map([
            ['belongs to node', NodeTypeEnum.COMPANY],
            ['belongs to node', NodeTypeEnum.BRAND],
            ['belongs to node', NodeTypeEnum.CAR_MODEL],
            ['belongs to node', NodeTypeEnum.RACE_TRACK],
            ['belongs to node', NodeTypeEnum.TRACK_LAYOUT],
        ]))

    const match = relationships.get(startNodeType)?.get(relationshipName)

    if (!match) {
        throw new Error('TEST ERROR: No relationship mapping found')
    }

    return match as NodeTypeEnum
}
