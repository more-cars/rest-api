import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ProgrammeNode} from "../../../../../../src/db/node-types/programmes/types/ProgrammeNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"

test('When there are no PROGRAMMES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Programme)

    const expectedProgrammes: ProgrammeNode[] = []
    const actualProgrammes = await fetchNodesFromDb(DbNodeType.Programme)

    expect(actualProgrammes)
        .toEqual(expectedProgrammes)
})

test('When PROGRAMMES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Programme)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Programme, amount)

    const actualProgrammes = await fetchNodesFromDb(DbNodeType.Programme)

    expect(actualProgrammes.length)
        .toEqual(amount)
})
