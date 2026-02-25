import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const image = await seedNode(DbNodeType.Image)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSeries.createHasPrimeImageRelationship(racingSeries.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
