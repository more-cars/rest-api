import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"
import {seedCarModel} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

Given('there exists a relationship {string} between IMAGE {string} and a CAR MODEL',
    async (relationshipLabel: string, imageLabel: string) => {
        const image: ImageNode = world.recallNode(imageLabel)
        const carModel = await seedCarModel()

        const response = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
