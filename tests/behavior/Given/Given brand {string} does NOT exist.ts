import {Given} from "@cucumber/cucumber"
import {BrandNode} from "../../../src/types/brands/BrandNode"

Given('brand {string} does NOT exist', async function (label: string) {
    const brand: BrandNode = {
        id: -42,
        name: "Non-existing Brand",
        created_at: "",
        updated_at: "",
    }

    this.brand[label] = brand
})
