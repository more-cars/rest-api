import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user requests the BRAND {string} via ID',
    async (label: string) => {
        const brand: BrandNode = world.recallNode(label).data

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}`)

        world.rememberResponse(response)
    })
