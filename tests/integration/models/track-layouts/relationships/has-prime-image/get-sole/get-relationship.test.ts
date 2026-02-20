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

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.TRACK_LAYOUT, ControllerNodeType.IMAGE, RelationshipType.TrackLayoutHasPrimeImage)
        const expectedTrackLayoutId = expectedRelationship.start_node.properties.id
        const expectedImageId = expectedRelationship.end_node.properties.id
        const actualRelationship = await TrackLayout.getHasPrimeImageRelationship(expectedTrackLayoutId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.properties.id)
            .toBe(expectedTrackLayoutId)

        expect(actualRelationship.destination.properties.id)
            .toBe(expectedImageId)
    })

    test('node exists, but not the relationship', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(TrackLayout.getHasPrimeImageRelationship(trackLayout.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(TrackLayout.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
