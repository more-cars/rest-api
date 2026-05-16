import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeMagazineIssue} from "../../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputMagazineIssueCreate} from "../../../../../../src/db/node-types/magazine-issues/types/InputMagazineIssueCreate"
import type {MagazineIssueNode} from "../../../../../../src/db/node-types/magazine-issues/types/MagazineIssueNode"

describe('Updating MAGAZINE ISSUE', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.MagazineIssue)
        const inputData = FakeMagazineIssue.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.MagazineIssue, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.MagazineIssue)
        const inputData = createdNode.properties as unknown as InputMagazineIssueCreate
        const updatedNode = await updateDbNode(DbNodeType.MagazineIssue, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.MagazineIssue)
        const inputData = createdNode.properties as unknown as InputMagazineIssueCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.title = null
        const updatedNode = await updateDbNode(DbNodeType.MagazineIssue, createdNode.properties.id, inputData) as MagazineIssueNode

        expect(updatedNode.properties.title)
            .toBeNull()
    })
})
