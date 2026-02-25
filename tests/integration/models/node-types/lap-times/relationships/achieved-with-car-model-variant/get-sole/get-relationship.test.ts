import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.CarModelVariant, RelationshipType.LapTimeAchievedWithCarModelVariant)
        const expectedLapTimeId = expectedRelationship.start_node.properties.id
        const expectedCarModelVariantId = expectedRelationship.end_node.properties.id
        const actualRelationship = await LapTime.getAchievedWithCarModelVariantRelationship(expectedLapTimeId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedLapTimeId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedCarModelVariantId)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(LapTime.getAchievedWithCarModelVariantRelationship(lapTime.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(LapTime.getAchievedWithCarModelVariantRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
