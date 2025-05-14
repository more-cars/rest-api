import {Given} from "@cucumber/cucumber"
import {seedCarModel} from "../../dbSeeding/seedCarModel"

Given('there exists a car model {string}', async function (label: string) {
    this.carModel[label] = await seedCarModel()
})
