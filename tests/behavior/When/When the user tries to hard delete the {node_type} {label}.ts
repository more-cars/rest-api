import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import type {BaseNode} from "../../../src/db/types/BaseNode"

When('the user tries to hard delete the {string} {string}',
    async (nodeType: string, label: string) => {
        let node: BaseNode
        let path: string

        switch (nodeType.toLowerCase()) {
            case 'brand':
                node = world.recallNode(label)
                path = 'brands'
                break
            case 'car model':
                node = world.recallNode(label)
                path = 'car-models'
                break
            case 'image':
                node = world.recallNode(label)
                path = 'images'
                break
            default:
                return
        }

        const response = await axios
            .delete(`${process.env.API_URL}/${path}/${node.id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
