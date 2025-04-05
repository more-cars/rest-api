import {Given} from "@cucumber/cucumber"
import {seedCarModel} from "../dbSeeding/seedCarModel"

Given('there exists a car model A', async function () {
    this.carModelA = await seedCarModel()
})
