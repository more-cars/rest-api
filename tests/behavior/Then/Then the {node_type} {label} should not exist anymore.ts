import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import type {BaseNode} from "../../../src/db/types/BaseNode"

Then('the {string} {string} should not exist anymore',
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
            .get(`${process.env.API_URL}/${path}/${node.id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed')
        }

        assert.equal(response.status, 404)
    })
