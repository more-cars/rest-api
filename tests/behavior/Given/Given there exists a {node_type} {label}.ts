import {Given, world} from "@cucumber/cucumber"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedImage} from "../../_toolbox/dbSeeding/images/nodes/seedImage"

Given('there exists a(n) {string} {string}',
    async (nodeType: string, label: string) => {
        switch (nodeType.toLowerCase()) {
            case 'brand':
                world.rememberNode(await seedBrand(), label)
                break
            case 'car model':
                world.rememberNode(await seedCarModel(), label)
                break
            case 'image':
                world.rememberNode(await seedImage(), label)
                break
        }
    })
