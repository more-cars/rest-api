import {Given} from "@cucumber/cucumber"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedImage} from "../../_toolbox/dbSeeding/images/nodes/seedImage"

Given('there exists a(n) {string} {string}', async function (nodeType: string, label: string) {
    switch (nodeType.toLowerCase()) {
        case 'brand':
            this.brand[label] = await seedBrand()
            break
        case 'car model':
            this.carmodel[label] = await seedCarModel()
            break
        case 'image':
            this.image[label] = await seedImage()
            break
    }
})
