import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.IMAGE, RelationshipType.RacingEventHasPrimeImage)
        const expectedRacingEventId = expectedRelationship.start_node_id
        const expectedImageId = expectedRelationship.end_node_id
        const actualRelationship = await RacingEvent.getHasPrimeImageRelationship(expectedRacingEventId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedRacingEventId)

        expect(actualRelationship.destination.id)
            .toBe(expectedImageId)
    })

    test('node exists, but not the relationship', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingEvent.getHasPrimeImageRelationship(racingEvent.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(RacingEvent.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
