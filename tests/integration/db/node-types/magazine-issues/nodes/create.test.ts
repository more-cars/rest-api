import {describe, expect, test} from 'vitest'
import {FakeMagazineIssue} from "../../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMagazineIssue.dbInput()
        const createdNode = await createDbNode(DbNodeType.MagazineIssue, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMagazineIssue.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.MagazineIssue, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
