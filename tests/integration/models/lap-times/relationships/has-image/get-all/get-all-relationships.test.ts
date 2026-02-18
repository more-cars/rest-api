import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        await seedRelationshipForStartNode(lapTime.id, NodeTypeEnum.IMAGE, RelationshipType.LapTimeHasImage)
        await seedRelationshipForStartNode(lapTime.id, NodeTypeEnum.IMAGE, RelationshipType.LapTimeHasImage)

        const relationships = await LapTime.getAllHasImageRelationships(lapTime.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const relationships = await LapTime.getAllHasImageRelationships(lapTime.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(LapTime.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
