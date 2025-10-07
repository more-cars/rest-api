import {describe, expect, test} from 'vitest'
import {deleteAllImages} from "../../../../../_toolbox/dbSeeding/images/nodes/deleteAllImages"
import type {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {Image} from "../../../../../../src/models/images/Image"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedImage} from "../../../../../_toolbox/dbSeeding/images/nodes/seedImage"

describe('A filtered "get all IMAGE nodes" request returns only the matching nodes', () => {
    test('when there exist NO image nodes', async () => {
        await deleteAllImages()

        const expectedNodes: Array<ImageNode> = []
        const actualNodes = await Image.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist image nodes', async () => {
        await deleteAllImages()
        const nodeA = await seedImage({name: 'A Node'})
        await seedImage({name: 'B Node'})
        await seedImage({name: 'C Node'})

        const filteredNodes = await Image.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
