import {Given} from "@cucumber/cucumber"
import {seedBrand} from "../../dbSeeding/seedBrand"

Given('there exists a brand {string}', async function (label: string) {
    this.brand[label] = await seedBrand()
})
