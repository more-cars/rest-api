import {Given} from "@cucumber/cucumber"
import {deleteAllBrands} from "../../_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import {deleteAllCarModels} from "../../_toolbox/dbSeeding/car-models/nodes/deleteAllCarModels"
import {deleteAllImages} from "../../_toolbox/dbSeeding/images/nodes/deleteAllImages"
import {seedBrands} from "../../_toolbox/dbSeeding/brands/nodes/seedBrands"
import {seedCarModels} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {seedImages} from "../../_toolbox/dbSeeding/images/nodes/seedImages"

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
