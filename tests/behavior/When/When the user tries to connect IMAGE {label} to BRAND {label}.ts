import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user tries to connect IMAGE {string} to BRAND {string}',
    async (imageLabel: string, brandLabel: string) => {
        const brand: BrandNode = world.recallNode(brandLabel)
        const image: ImageNode = world.recallNode(imageLabel)

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
