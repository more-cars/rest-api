import {seedBrands} from "../../../../dbSeeding/brands/nodes/seedBrands"
import {seedCarModels} from "../../../../dbSeeding/car-models/nodes/seedCarModels"
import {seedImages} from "../../../../dbSeeding/images/nodes/seedImages"
import {removeDuplicates} from "../../../../_helpers/removeDuplicates"

describe('Create Node', () => {
    test('Each node is created with a different ID', async () => {
        const brands = await seedBrands(20)
        const carModels = await seedCarModels(20)
        const images = await seedImages(20); // DO NOT REMOVE THIS SEMICOLON!

        [brands, carModels, images].forEach(nodes => {
            const extractedIds = nodes.map(node => node.id)
            const deduplicatedIds = removeDuplicates(extractedIds)

            expect(extractedIds.length)
                .toBe(deduplicatedIds.length)
        })
    })
})
