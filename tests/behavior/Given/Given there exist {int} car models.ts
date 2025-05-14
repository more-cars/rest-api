import {Given} from "@cucumber/cucumber"
import {seedCarModels} from "../../dbSeeding/seedCarModels"
import {deleteAllCarModels} from "../../dbSeeding/deleteAllCarModels"

Given('there exist {int} car models', async function (amount: number) {
    await deleteAllCarModels()
    await seedCarModels(amount)
})
