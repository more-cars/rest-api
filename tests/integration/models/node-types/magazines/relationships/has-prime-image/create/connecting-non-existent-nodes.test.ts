import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const image = await seedNode(DbNodeType.Image)

    await expect(Magazine.createHasPrimeImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Magazine.createHasPrimeImageRelationship(magazine.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Magazine.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
