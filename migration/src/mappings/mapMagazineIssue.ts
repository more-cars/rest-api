import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapMagazineIssue(oldNode: Node): DbInputData {
    return {
        title: oldNode.properties.name,
        consecutive_number: oldNode.properties.consecutive_number,
        issue_number: oldNode.properties.issue,
        issue_year: oldNode.properties.year,
        release_date: oldNode.properties.release_date,
        single_copy_price: oldNode.properties.single_copy_price,
        single_copy_price_unit: oldNode.properties.single_copy_price_unit,
        pages: oldNode.properties.pages,
    }
}
