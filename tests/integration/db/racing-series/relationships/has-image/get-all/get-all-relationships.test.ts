import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
        await seedRelationshipForStartNode(racingSeries.id, ControllerNodeType.IMAGE, RelationshipType.RacingSeriesHasImage)
        await seedRelationshipForStartNode(racingSeries.id, ControllerNodeType.IMAGE, RelationshipType.RacingSeriesHasImage)

        const relationships = await getRelationshipCollection(
            racingSeries.id,
            RelationshipType.RacingSeriesHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)

        const relationships = await getRelationshipCollection(
            racingSeries.id,
            RelationshipType.RacingSeriesHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingSeriesHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
