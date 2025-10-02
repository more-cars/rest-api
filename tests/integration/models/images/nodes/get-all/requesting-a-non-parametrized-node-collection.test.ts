import {describe, expect, test} from 'vitest'
import {deleteAllImages} from "../../../../../_toolbox/dbSeeding/images/nodes/deleteAllImages"
import type {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {Image} from "../../../../../../src/models/images/Image"
import {seedImages} from "../../../../../_toolbox/dbSeeding/images/nodes/seedImages"

describe('A non-parametrized "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist NO company nodes', async () => {
        await deleteAllImages()

        const expectedNodes: Array<ImageNode> = []
        const actualNodes = await Image.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist company nodes', async () => {
        await deleteAllImages()
        const amount = Math.ceil(Math.random() * 20)
        await seedImages(amount)

        const actualNodes = await Image.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
