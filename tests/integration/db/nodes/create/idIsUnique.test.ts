import {seedBrands} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrands"
import {seedCarModels} from "../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {seedImages} from "../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {removeDuplicates} from "../../../../_toolbox/removeDuplicates"

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
