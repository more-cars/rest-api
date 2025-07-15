import {Given} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {seedBrand} from "../../_toolbox/dbSeeding/brands/nodes/seedBrand"

Given('there exist {int} relationships for IMAGE {string}',
    async function (amount: number, imageLabel: string) {
        const imageNode: ImageNode = this.image[imageLabel]

        for (let i = 0; i < amount; i++) {
            const partnerNode = await seedBrand()

            await axios
                .post(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`)
                .catch(error => {
                    console.error(error)
                })
        }
    })
