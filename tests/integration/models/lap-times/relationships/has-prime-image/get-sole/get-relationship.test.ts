import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {REL, seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.IMAGE, DbRelationship.LapTimeHasPrimeImage, REL.FORWARD)
        const expectedLapTimeId = expectedRelationship.start_node_id
        const expectedImageId = expectedRelationship.end_node_id
        const actualRelationship = await LapTime.getHasPrimeImageRelationship(expectedLapTimeId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedLapTimeId)

        expect(actualRelationship.destination.id)
            .toBe(expectedImageId)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(LapTime.getHasPrimeImageRelationship(lapTime.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(LapTime.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
