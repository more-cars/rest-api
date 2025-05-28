import {Given} from "@cucumber/cucumber"
import {deleteAllBrands} from "../../dbSeeding/deleteAllBrands"
import {deleteAllCarModels} from "../../dbSeeding/deleteAllCarModels"
import {deleteAllImages} from "../../dbSeeding/deleteAllImages"
import {seedBrands} from "../../dbSeeding/seedBrands"
import {seedCarModels} from "../../dbSeeding/seedCarModels"
import {seedImages} from "../../dbSeeding/seedImages"

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
