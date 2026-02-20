import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('RACING SERIES node does not exist', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)

        await expect(RacingSeries.deleteHasPrimeImageRelationship(racingSeries.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(RacingSeries.deleteHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SERIES node and IMAGE node do not exist', async () => {
        await expect(RacingSeries.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(RacingSeries.deleteHasPrimeImageRelationship(racingSeries.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_SERIES, ControllerNodeType.IMAGE, RelationshipType.RacingSeriesHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSeriesHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSeries.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSeriesHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
