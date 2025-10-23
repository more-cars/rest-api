import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('RACING SERIES node does not exist', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        await expect(RacingSeries.deleteHasPrimeImageRelationship(racingSeries.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.RACING_SERIES)

        await expect(RacingSeries.deleteHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node and IMAGE node do not exist', async () => {
        await expect(RacingSeries.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(RacingSeries.deleteHasPrimeImageRelationship(racingSeries.id, image.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_SERIES, NodeTypeEnum.IMAGE, DbRelationship.RacingSeriesHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingSeriesHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSeries.deleteHasPrimeImageRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingSeriesHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
