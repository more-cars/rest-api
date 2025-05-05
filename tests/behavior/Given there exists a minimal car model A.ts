import {Given} from "@cucumber/cucumber"
import {seedCarModelMinimal} from "../dbSeeding/seedCarModelMinimal"

Given('there exists a minimal car model A', async function () {
    this.carModelA = await seedCarModelMinimal()
})
