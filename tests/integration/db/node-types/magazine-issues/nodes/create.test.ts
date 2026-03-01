import {describe, expect, test} from 'vitest'
import {FakeMagazineIssue} from "../../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"
import {createNode} from "../../../../../../src/db/node-types/magazine-issues/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMagazineIssue.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMagazineIssue.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
