import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
        await seedRelationshipForStartNode(racingSeries.id, ControllerNodeType.IMAGE, RelationshipType.RacingSeriesHasImage)
        await seedRelationshipForStartNode(racingSeries.id, ControllerNodeType.IMAGE, RelationshipType.RacingSeriesHasImage)

        const relationships = await getRelationshipCollection(
            racingSeries.id,
            RelationshipType.RacingSeriesHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)

        const relationships = await getRelationshipCollection(
            racingSeries.id,
            RelationshipType.RacingSeriesHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingSeriesHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
