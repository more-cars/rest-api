import {Given} from "@cucumber/cucumber"
import {deleteAllCarModels} from "../../dbSeeding/deleteAllCarModels"

Given('there exist NO car models', async function () {
    await deleteAllCarModels()
})
