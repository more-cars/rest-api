import {describe, expect, test} from 'vitest'
import {deleteAllImages} from "../../../../../_toolbox/dbSeeding/images/nodes/deleteAllImages"
import type {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {Image} from "../../../../../../src/models/images/Image"
import {seedImage} from "../../../../../_toolbox/dbSeeding/images/nodes/seedImage"

describe('A sorted "get all IMAGE nodes" request returns the nodes in correct order', () => {
    test('when there exist NO image nodes', async () => {
        await deleteAllImages()

        const expectedNodes: Array<ImageNode> = []
        const actualNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist image nodes', async () => {
        await deleteAllImages()
        const nodeA = await seedImage({name: 'A Node'})
        const nodeB = await seedImage({name: 'B Node'})
        const nodeC = await seedImage({name: 'C Node'})

        const ascNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
