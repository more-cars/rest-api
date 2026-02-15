import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        await seedRelationshipForStartNode(lapTime.id, NodeTypeEnum.IMAGE, DbRelationship.LapTimeHasImage)
        await seedRelationshipForStartNode(lapTime.id, NodeTypeEnum.IMAGE, DbRelationship.LapTimeHasImage)

        const relationships = await getRelationshipCollection(
            lapTime.id,
            DbRelationship.LapTimeHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const relationships = await getRelationshipCollection(
            lapTime.id,
            DbRelationship.LapTimeHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.LapTimeHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
