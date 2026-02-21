import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›belongs-to-race-track‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.TrackLayout, ControllerNodeType.RaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack)
        const expectedTrackLayoutId = expectedRelationship.start_node.properties.id
        const expectedRaceTrackId = expectedRelationship.end_node.properties.id
        const actualRelationship = await TrackLayout.getBelongsToRaceTrackRelationship(expectedTrackLayoutId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedTrackLayoutId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedRaceTrackId)
    })

    test('node exists, but not the relationship', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TrackLayout)

        await expect(TrackLayout.getBelongsToRaceTrackRelationship(trackLayout.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(TrackLayout.getBelongsToRaceTrackRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
