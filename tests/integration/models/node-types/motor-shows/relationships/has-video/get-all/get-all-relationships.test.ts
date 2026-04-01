import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        await seedRelationshipForStartNode(motorShow.properties.id, DbNodeType.Video, RelationshipType.MotorShowHasVideo)
        await seedRelationshipForStartNode(motorShow.properties.id, DbNodeType.Video, RelationshipType.MotorShowHasVideo)

        const relationships = await MotorShow.getAllHasVideoRelationships(motorShow.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        const relationships = await MotorShow.getAllHasVideoRelationships(motorShow.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(MotorShow.getAllHasVideoRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
