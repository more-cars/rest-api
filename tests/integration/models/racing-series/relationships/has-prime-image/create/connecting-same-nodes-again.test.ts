import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
