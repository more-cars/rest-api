import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.MotorShow, DbNodeType.Image, RelationshipType.MotorShowHasPrimeImage)
        const expectedMotorShowId = expectedRelationship.start_node.properties.id
        const expectedImageId = expectedRelationship.end_node.properties.id
        const actualRelationship = await MotorShow.getHasPrimeImageRelationship(expectedMotorShowId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedMotorShowId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedImageId)
    })

    test('node exists, but not the relationship', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        await expect(MotorShow.getHasPrimeImageRelationship(motorShow.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(MotorShow.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
