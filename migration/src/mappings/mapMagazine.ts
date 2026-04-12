import {Node} from "neo4j-driver"
import type {InputMagazineCreate} from "../../../src/db/node-types/magazines/types/InputMagazineCreate"

export function mapMagazine(oldNode: Node): InputMagazineCreate {
    return {
        name: oldNode.properties.name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        focus: oldNode.properties.focus,
        publication_frequency: convertToFrequency(oldNode.properties.issues_per_year),
        single_copy_price: oldNode.properties.single_copy_price,
        single_copy_price_unit: oldNode.properties.single_copy_price_unit,
        publication_format: oldNode.properties.distribution,
        circulation: oldNode.properties.circulation,
        circulation_year: oldNode.properties.circulation_year,
        publisher: oldNode.properties.publisher,
        issn: oldNode.properties.issn,
        country_code: null,
    }
}

function convertToFrequency(issues_per_year: number) {
    switch (issues_per_year) {
        case 1:
            return 'yearly'
        case 2:
            return 'twice a year'
        case 4:
            return 'quarterly'
        case 6:
            return 'every two months'
        case 9:
            return 'every six weeks'
        case 12:
        case 13:
            return 'monthly'
        case 24:
        case 26:
            return 'twice per month'
        case 52:
            return 'weekly'
        default:
            return 'irregular'
    }
}
