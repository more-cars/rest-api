import {Given} from "@cucumber/cucumber"
import {seedBrand} from "../dbSeeding/seedBrand"

Given('there exists a brand A', async function () {
    this.brandA = await seedBrand()
})
