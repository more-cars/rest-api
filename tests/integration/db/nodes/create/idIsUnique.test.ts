import {expect, test} from 'vitest'
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {removeDuplicates} from "../../../../_toolbox/removeDuplicates"

test('Each node is created with a different ID', async () => {
    const brands = await seedNodes(NodeTypeEnum.BRAND, 20)
    const carModels = await seedNodes(NodeTypeEnum.CAR_MODEL, 20)
    const images = await seedNodes(NodeTypeEnum.IMAGE, 20); // DO NOT REMOVE THIS SEMICOLON!

    [brands, carModels, images].forEach(nodes => {
        const extractedIds = nodes.map(node => node.id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        expect(extractedIds.length)
            .toBe(deduplicatedIds.length)
    })
}, 15000)
