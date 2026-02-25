import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a GAMING PLATFORM', () => {
    test('which does not exist', async () => {
        await expect(GamingPlatform.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedGamingPlatform = await seedNode(DbNodeType.GamingPlatform)
        const actualGamingPlatform = await GamingPlatform.findById(expectedGamingPlatform.properties.id)

        expect(actualGamingPlatform.attributes)
            .toEqual(expectedGamingPlatform.properties)
    })
})
