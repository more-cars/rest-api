import {expect, test} from 'vitest'
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {removeDuplicates} from "../../../../_toolbox/removeDuplicates"

test('Each node is created with a different ID', async () => {
    const brands = await seedNodes(DbNodeType.Brand, 20)
    const carModels = await seedNodes(DbNodeType.CarModel, 20)
    const images = await seedNodes(DbNodeType.Image, 20); // DO NOT REMOVE THIS SEMICOLON!

    [brands, carModels, images].forEach(nodes => {
        const extractedIds = nodes.map(node => node.properties.id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        expect(extractedIds.length)
            .toBe(deduplicatedIds.length)
    })
}, 15000)
