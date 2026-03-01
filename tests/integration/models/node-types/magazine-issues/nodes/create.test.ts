import {expect, test} from 'vitest'
import {FakeMagazineIssue} from "../../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeMagazineIssue.dbInput
    const createdNode = await MagazineIssue.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeMagazineIssue.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await MagazineIssue.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
