import type {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {deleteAllBrands} from "../../tests/_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import {deleteAllCarModels} from "../../tests/_toolbox/dbSeeding/car-models/nodes/deleteAllCarModels"
import {deleteAllImages} from "../../tests/_toolbox/dbSeeding/images/nodes/deleteAllImages"
import {deleteAllCompanies} from "../../tests/_toolbox/dbSeeding/companies/nodes/deleteAllCompanies"

export function deleteNodesOfType(nodeType: NodeTypeLabel) {
    switch (nodeType) {
        case 'Company':
            return deleteAllCompanies()
        case 'Brand':
            return deleteAllBrands()
        case 'CarModel':
            return deleteAllCarModels()
        case 'Image':
            return deleteAllImages()
    }

    throw new Error('Unknown Node Type')
}
