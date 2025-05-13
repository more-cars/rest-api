import {Given} from "@cucumber/cucumber"
import {seedCarModel} from "../dbSeeding/seedCarModel"

Given('there exists a car model B', async function () {
    this.carModelB = await seedCarModel()
})
