import {Given} from "@cucumber/cucumber"
import {deleteAllBrands} from "../../dbSeeding/deleteAllBrands"

Given('there exist NO brands', async function () {
    await deleteAllBrands()
})
