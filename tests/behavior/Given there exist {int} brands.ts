import {Given} from "@cucumber/cucumber"
import {deleteAllBrands} from "../dbSeeding/deleteAllBrands"
import {seedBrands} from "../dbSeeding/seedBrands"

Given('there exist {int} brands', async function (amount: number) {
    await deleteAllBrands()
    await seedBrands(amount)
})
