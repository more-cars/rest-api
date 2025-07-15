import {Given} from "@cucumber/cucumber"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {
    seedBrandHasImageRelationship
} from "../../_toolbox/dbSeeding/brands/relationships/seedBrandHasImageRelationship"

Given('there are {int} IMAGEs connected to BRAND {string}',
    async function (amount: number, label: string) {
        const brand: BrandNode = this.brand[label]

        for (let i = 0; i < amount; i++) {
            await seedBrandHasImageRelationship(brand)
        }
    })
