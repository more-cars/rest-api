import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('RACING SERIES node does not exist', async () => {
        const racingSeries = await seedNode(DbNodeType.RacingSeries)

        await expect(RacingSeries.deleteHasImageRelationship(racingSeries.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(RacingSeries.deleteHasImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SERIES node and IMAGE node do not exist', async () => {
        await expect(RacingSeries.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const racingSeries = await seedNode(DbNodeType.RacingSeries)
        const image = await seedNode(DbNodeType.Image)

        await expect(RacingSeries.deleteHasImageRelationship(racingSeries.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingSeries, DbNodeType.Image, RelationshipType.RacingSeriesHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSeriesHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSeries.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSeriesHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
