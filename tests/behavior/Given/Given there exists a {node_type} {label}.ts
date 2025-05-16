import {Given} from "@cucumber/cucumber"
import {seedBrand} from "../../dbSeeding/seedBrand"
import {seedCarModel} from "../../dbSeeding/seedCarModel"

Given('there exists a {string} {string}', async function (nodeType: string, label: string) {
    switch (nodeType) {
        case 'brand':
            this.brand[label] = await seedBrand()
            break
        case 'car model':
            this.carModel[label] = await seedCarModel()
            break
    }
})
