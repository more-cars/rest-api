import {Node} from "neo4j-driver"
import type {InputMagazineIssueCreate} from "../../../src/db/node-types/magazine-issues/types/InputMagazineIssueCreate"

export function mapMagazineIssue(oldNode: Node): InputMagazineIssueCreate {
    return {
        title: oldNode.properties.name,
        consecutive_number: oldNode.properties.consecutive_number,
        issue_number: oldNode.properties.issue,
        issue_year: oldNode.properties.year,
        release_date: oldNode.properties.release_date,
        single_copy_price: oldNode.properties.single_copy_price,
        single_copy_price_unit: oldNode.properties.single_copy_price,
        pages: oldNode.properties.pages,
    }
}
