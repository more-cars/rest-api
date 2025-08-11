import {Given} from "@cucumber/cucumber"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"
import type {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

Given('there exists a relationship {string} between IMAGE {string} and CAR MODEL {string}',
    async function (relationshipLabel: string, imageLabel: string, carModelLabel: string) {
        const image: ImageNode = this.image[imageLabel]
        const carModel: CarModelNode = this.carmodel[carModelLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[relationshipLabel] = this.latestResponse.data
    })
