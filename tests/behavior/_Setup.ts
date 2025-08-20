import {setWorldConstructor, World} from "@cucumber/cucumber"

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
