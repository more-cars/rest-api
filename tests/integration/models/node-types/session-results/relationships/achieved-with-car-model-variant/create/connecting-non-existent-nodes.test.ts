import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-with-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
