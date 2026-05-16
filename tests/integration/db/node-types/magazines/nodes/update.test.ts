import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeMagazine} from "../../../../../_toolbox/fixtures/nodes/FakeMagazine"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputMagazineCreate} from "../../../../../../src/db/node-types/magazines/types/InputMagazineCreate"
import type {MagazineNode} from "../../../../../../src/db/node-types/magazines/types/MagazineNode"

describe('Updating MAGAZINE', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.Magazine)
        const inputData = FakeMagazine.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.Magazine, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.Magazine)
        const inputData = createdNode.properties as unknown as InputMagazineCreate
        const updatedNode = await updateDbNode(DbNodeType.Magazine, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.Magazine)
        const inputData = createdNode.properties as unknown as InputMagazineCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.Magazine, createdNode.properties.id, inputData) as MagazineNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
