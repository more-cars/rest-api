import {Given} from "@cucumber/cucumber"
import {deleteAllBrands} from "../../dbSeeding/deleteAllBrands"
import {seedBrands} from "../../dbSeeding/seedBrands"
import {seedCarModel} from "../../dbSeeding/seedCarModel"
import {deleteAllCarModels} from "../../dbSeeding/deleteAllCarModels"

Given('there exist {int} {string}s', async function (amount: number, nodeType: string) {
    switch (nodeType) {
        case 'brand':
            await deleteAllBrands()
            await seedBrands(amount)
            break
        case 'car model':
            await deleteAllCarModels()
            await seedCarModel()
            break
    }
})
