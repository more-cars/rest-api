import {describe, expect, test} from 'vitest'
import {Magazine} from "../../../../../../src/models/node-types/magazines/Magazine"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a MAGAZINE', () => {
    test('which does not exist', async () => {
        await expect(Magazine.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedMagazine = await seedNode(DbNodeType.Magazine)
        const actualMagazine = await Magazine.findById(expectedMagazine.properties.id)

        expect(actualMagazine.attributes)
            .toEqual(expectedMagazine.properties)
    })
})
