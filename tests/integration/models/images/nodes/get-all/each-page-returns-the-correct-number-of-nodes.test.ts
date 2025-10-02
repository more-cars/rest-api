import {describe, expect, test} from 'vitest'
import {deleteAllImages} from "../../../../../_toolbox/dbSeeding/images/nodes/deleteAllImages"
import type {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {Image} from "../../../../../../src/models/images/Image"
import {seedImages} from "../../../../../_toolbox/dbSeeding/images/nodes/seedImages"

describe('Each page of a "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO company nodes (page=$0)', async (page) => {
        await deleteAllImages()

        const expectedNodes: Array<ImageNode> = []
        const actualNodes = await Image.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 company nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllImages()
        await seedImages(totalNodeAmount)

        const actualNodes = await Image.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
