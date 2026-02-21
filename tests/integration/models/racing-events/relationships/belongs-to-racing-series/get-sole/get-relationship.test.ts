import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›belongs-to-racing-series‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.RACING_EVENT, ControllerNodeType.RACING_SERIES, RelationshipType.RacingEventBelongsToRacingSeries)
        const expectedRacingEventId = expectedRelationship.start_node.properties.id
        const expectedRacingSeriesId = expectedRelationship.end_node.properties.id
        const actualRelationship = await RacingEvent.getBelongsToRacingSeriesRelationship(expectedRacingEventId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedRacingEventId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedRacingSeriesId)
    })

    test('node exists, but not the relationship', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        await expect(RacingEvent.getBelongsToRacingSeriesRelationship(racingEvent.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(RacingEvent.getBelongsToRacingSeriesRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
