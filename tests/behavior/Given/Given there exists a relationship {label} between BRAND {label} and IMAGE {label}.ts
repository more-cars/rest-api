import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

Given('there exists a relationship {string} between BRAND {string} and IMAGE {string}',
    async (relationshipLabel: string, brandLabel: string, imageLabel: string) => {
        const brand: BrandNode = world.recallNode(brandLabel)
        const image: ImageNode = world.recallNode(imageLabel)

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
