import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"
import type {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

Given('there exists a relationship {string} between IMAGE {string} and CAR MODEL {string}',
    async (relationshipLabel: string, imageLabel: string, carModelLabel: string) => {
        const image: ImageNode = world.recallNode(imageLabel)
        const carModel: CarModelNode = world.recallNode(carModelLabel)

        const response = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
