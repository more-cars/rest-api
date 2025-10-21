import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.RACE_TRACK, NodeTypeEnum.IMAGE, DbRelationship.RaceTrackHasPrimeImage)
        const actualRelationship = await RaceTrack.getHasPrimeImageRelationship(expectedRelationship.start_node_id)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.destination.id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('node exists, but not the relationship', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        await expect(RaceTrack.getHasPrimeImageRelationship(raceTrack.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(RaceTrack.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
