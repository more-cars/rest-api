import {Given} from "@cucumber/cucumber"
import {BrandNode} from "../../../src/types/BrandNode"

Given('brand {string} does NOT exist', async function (label: string) {
    const brand: BrandNode = {
        id: -42,
        name: "Non-existing Brand",
    }

    this.brand[label] = brand
})
