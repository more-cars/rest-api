import {Given} from "@cucumber/cucumber"
import {deleteAllBrands} from "../../dbSeeding/brands/nodes/deleteAllBrands"
import {deleteAllCarModels} from "../../dbSeeding/car-models/nodes/deleteAllCarModels"
import {deleteAllImages} from "../../dbSeeding/images/nodes/deleteAllImages"
import {seedBrands} from "../../dbSeeding/brands/nodes/seedBrands"
import {seedCarModels} from "../../dbSeeding/car-models/nodes/seedCarModels"
import {seedImages} from "../../dbSeeding/images/nodes/seedImages"

Given('there exist {int} {string}s', async function (amount: number, nodeType: string) {
    switch (nodeType.toLowerCase()) {
        case 'brand':
            await deleteAllBrands()
            await seedBrands(amount)
            break
        case 'car model':
            await deleteAllCarModels()
            await seedCarModels(amount)
            break
        case 'image':
            await deleteAllImages()
            await seedImages(amount)
            break
    }
})
