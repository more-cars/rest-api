import {setWorldConstructor, World} from "@cucumber/cucumber"
import axios from "axios"

// By default, Axios fails every request that returns with a status code >= 400.
// But for the tests we only want them to fail when a server error occurred (status code >= 500).
axios.defaults.validateStatus = function (status) {
    return status < 500
}

// Adding a handful of helper functions to the cucumber "world"
// to simplify the test code and make it more stable.
class CustomWorld extends World {
    nodes = new Map<string, any>()
    relationships = new Map<string, any>()
    response: any

    constructor(options: any) {
        super(options)
    }

    rememberNode(node: any, label: string) {
        this.nodes.set(label, node)
    }

    recallNode(label: string) {
        return this.nodes.get(label)
    }

    rememberRelationship(relationship: any, label: string) {
        this.relationships.set(label, relationship)
    }

    recallRelationship(label: string) {
        return this.relationships.get(label)
    }

    rememberResponse(response: any) {
        this.response = response
    }

    recallResponse() {
        return this.response
    }
}

setWorldConstructor(CustomWorld)
