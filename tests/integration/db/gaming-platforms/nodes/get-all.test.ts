import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {GamingPlatformNode} from "../../../../../src/db/nodes/gaming-platforms/types/GamingPlatformNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/gaming-platforms/getAllNodesOfType"

test('When there are no GAMING PLATFORMS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.GamingPlatform)

    const expectedGamingPlatforms: GamingPlatformNode[] = []
    const actualGamingPlatforms = await getAllNodesOfType()

    expect(actualGamingPlatforms)
        .toEqual(expectedGamingPlatforms)
})

test('When GAMING PLATFORMS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.GamingPlatform)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(DbNodeType.GamingPlatform, amount)

    const actualGamingPlatforms = await getAllNodesOfType()

    expect(actualGamingPlatforms.length)
        .toEqual(amount)
})
