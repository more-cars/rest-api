import type {InputCompanyCreate} from "../../src/db/nodes/companies/types/InputCompanyCreate"
import type {InputBrandCreate} from "../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../src/db/nodes/car-models/types/InputCarModelCreate"
import type {InputImageCreate} from "../../src/db/nodes/images/types/InputImageCreate"
import {createDbNode} from "../../src/db/nodes/createDbNode"
import type {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {createNodeQuery as createCompanyQuery} from "../../src/db/nodes/companies/createNode"
import {createNodeQuery as createBrandQuery} from "../../src/db/nodes/brands/createNode"
import {createNodeQuery as createCarModelQuery} from "../../src/db/nodes/car-models/createNode"
import {createNodeQuery as createImageQuery} from "../../src/db/nodes/images/createNode"
import {addMoreCarsIdToNode} from "../../src/db/nodes/addMoreCarsIdToNode"
import {addTimestampsToNode} from "../../src/db/nodes/addTimestampsToNode"
import type {Node} from "neo4j-driver"

export async function storeNode(data: InputCompanyCreate | InputBrandCreate | InputCarModelCreate | InputImageCreate, newNodeType: NodeTypeLabel, oldNode: Node): Promise<void> {
    let query = ''

    switch (newNodeType) {
        case 'Company':
            query = createCompanyQuery(data as InputCompanyCreate)
            break
        case 'Brand':
            query = createBrandQuery(data as InputBrandCreate)
            break
        case 'CarModel':
            query = createCarModelQuery(data as InputCarModelCreate)
            break
        case 'Image':
            query = createImageQuery(data as InputImageCreate)
            break
    }

    try {
        const createdNode: Node = await createDbNode(newNodeType, query)
        await addMoreCarsIdToNode(createdNode.elementId, parseInt(oldNode.elementId) + 10_000_000, newNodeType)
        await addTimestampsToNode(
            createdNode.elementId,
            new Date(oldNode.properties.created_at).toISOString(),
            new Date(oldNode.properties.updated_at).toISOString(),
        )
    } catch (e) {
        console.error(e)
        console.error(oldNode)
    }
}
