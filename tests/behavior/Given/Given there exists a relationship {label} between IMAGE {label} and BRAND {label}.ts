import {Given, world} from "@cucumber/cucumber"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"

Given('there exists a relationship {string} between IMAGE {string} and BRAND {string}',
    async (relationshipLabel: string, imageLabel: string, brandLabel: string) => {
        const image: ImageNode = world.recallNode(imageLabel)
        const brand: BrandNode = world.recallNode(brandLabel)

        const response = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
