import {Node} from "neo4j-driver"
import type {InputMagazineCreate} from "../../../src/db/node-types/magazines/types/InputMagazineCreate"

export function mapMagazine(oldNode: Node): InputMagazineCreate {
    return {
        name: oldNode.properties.name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        focus: oldNode.properties.focus,
        publication_frequency: oldNode.properties.issues_per_year,
        single_copy_price: oldNode.properties.single_copy_price,
        single_copy_price_unit: oldNode.properties.single_copy_price_unit,
        publication_format: oldNode.properties.distribution,
        circulation: oldNode.properties.circulation,
        circulation_year: oldNode.properties.circulation_year,
        publisher: oldNode.properties.publisher,
        issn: oldNode.properties.issn,
    }
}
