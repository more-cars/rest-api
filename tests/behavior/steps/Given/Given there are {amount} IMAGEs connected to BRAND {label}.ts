import {Given, world} from "@cucumber/cucumber"
import {BrandNode} from "../../../../src/models/brands/types/BrandNode"
import {
    seedBrandHasImageRelationship
} from "../../../_toolbox/dbSeeding/brands/relationships/seedBrandHasImageRelationship"

Given('there are {int} IMAGEs connected to BRAND {string}',
    async (amount: number, label: string) => {
        const brand: BrandNode = world.recallNode(label).data

        for (let i = 0; i < amount; i++) {
            await seedBrandHasImageRelationship(brand)
        }
    })
