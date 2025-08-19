import {Given} from "@cucumber/cucumber"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"

Given('there exists a relationship {string} between IMAGE {string} and a BRAND',
    async function (relationshipLabel: string, imageLabel: string) {
        const image: ImageNode = this.image[imageLabel]
        const brand = await seedBrand()

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[relationshipLabel] = this.latestResponse.data
    })
