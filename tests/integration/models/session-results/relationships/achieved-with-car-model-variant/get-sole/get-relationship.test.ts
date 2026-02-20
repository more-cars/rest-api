import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.SESSION_RESULT, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.SessionResultAchievedWithCarModelVariant)
        const expectedCarModelVariantId = expectedRelationship.start_node.properties.id
        const expectedSessionResultId = expectedRelationship.end_node.properties.id
        const actualRelationship = await SessionResult.getAchievedWithCarModelVariantRelationship(expectedCarModelVariantId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.properties.id)
            .toBe(expectedCarModelVariantId)

        expect(actualRelationship.destination.properties.id)
            .toBe(expectedSessionResultId)
    })

    test('node exists, but not the relationship', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        await expect(SessionResult.getAchievedWithCarModelVariantRelationship(sessionResult.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(SessionResult.getAchievedWithCarModelVariantRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
