import type {Node} from "neo4j-driver"
import {mapBrand} from "./mappings/mapBrand"
import type {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {mapCompany} from "./mappings/mapCompany"
import {mapCarModel} from "./mappings/mapCarModel"
import {mapImage} from "./mappings/mapImage"

export function mapNodeProperties(oldNode: Node, nodeType: NodeTypeLabel) {
    switch (nodeType) {
        case 'Company':
            return mapCompany(oldNode)
        case 'Brand':
            return mapBrand(oldNode)
        case 'CarModel':
            return mapCarModel(oldNode)
        case 'Image':
            return mapImage(oldNode)
    }

    throw new Error('Unknown Node Type')
}
