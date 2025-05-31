import {Given} from "@cucumber/cucumber"
import {seedCarModelMinimal} from "../../dbSeeding/car-models/nodes/seedCarModelMinimal"

Given('there exists a minimal car model {string}', async function (label: string) {
    this.carmodel[label] = await seedCarModelMinimal()
})
