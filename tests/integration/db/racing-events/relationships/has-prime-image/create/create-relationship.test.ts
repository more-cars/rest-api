import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEventRelationship} from "../../../../../../../src/models/racing-events/types/RacingEventRelationship"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            image.id,
            DbRelationship.RacingEventHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RacingEventRelationship.hasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            -42,
            DbRelationship.RacingEventHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
