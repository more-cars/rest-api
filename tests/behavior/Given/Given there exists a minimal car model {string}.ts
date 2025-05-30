import {Given} from "@cucumber/cucumber"
import {seedCarModelMinimal} from "../../dbSeeding/seedCarModelMinimal"

Given('there exists a minimal car model {string}', async function (label: string) {
    this.carmodel[label] = await seedCarModelMinimal()
})
