import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {MotorShowNode} from "../../../../../../src/db/node-types/motor-shows/types/MotorShowNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../../src/db/node-types/motor-shows/getAllNodesOfType"

test('When there are no MOTOR SHOWS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.MotorShow)

    const expectedMotorShows: MotorShowNode[] = []
    const actualMotorShows = await getAllNodesOfType()

    expect(actualMotorShows)
        .toEqual(expectedMotorShows)
})

test('When MOTOR SHOWS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.MotorShow)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.MotorShow, amount)

    const actualMotorShows = await getAllNodesOfType()

    expect(actualMotorShows.length)
        .toEqual(amount)
})
