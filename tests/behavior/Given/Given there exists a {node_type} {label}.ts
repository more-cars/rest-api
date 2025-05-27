import {Given} from "@cucumber/cucumber"
import {seedBrand} from "../../dbSeeding/seedBrand"
import {seedCarModel} from "../../dbSeeding/seedCarModel"
import {seedImage} from "../../dbSeeding/seedImage"

Given('there exists a {string} {string}', async function (nodeType: string, label: string) {
    switch (nodeType.toLowerCase()) {
        case 'brand':
            this.brand[label] = await seedBrand()
            break
        case 'car model':
            this.carModel[label] = await seedCarModel()
            break
        case 'image':
            this.image[label] = await seedImage()
            break
    }
})
