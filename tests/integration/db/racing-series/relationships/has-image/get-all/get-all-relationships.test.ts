import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
        await seedRelationshipForStartNode(racingSeries.id, NodeTypeEnum.IMAGE, DbRelationship.RacingSeriesHasImage)
        await seedRelationshipForStartNode(racingSeries.id, NodeTypeEnum.IMAGE, DbRelationship.RacingSeriesHasImage)

        const relationships = await getRelationshipCollection(
            racingSeries.id,
            DbRelationship.RacingSeriesHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        const relationships = await getRelationshipCollection(
            racingSeries.id,
            DbRelationship.RacingSeriesHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.RacingSeriesHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
