import {NodeTypeLabel} from "../../src/db/NodeTypeLabel";
import {DbRelationship} from "../../src/db/types/DbRelationship";

export function getAllRelationshipTypes() {
    return new Map<NodeTypeLabel, Map<NodeTypeLabel, DbRelationship[]>>(
        [
            [
                NodeTypeLabel.Company, new Map(
                [
                    [
                        NodeTypeLabel.Brand,
                        [
                            DbRelationship.CompanyHasBrand,
                        ],
                    ],
                    [
                        NodeTypeLabel.Image,
                        [
                            DbRelationship.CompanyHasImage,
                            DbRelationship.CompanyHasPrimeImage,
                        ],
                    ],
                ])
            ],
            [
                NodeTypeLabel.Brand, new Map(
                [
                    [
                        NodeTypeLabel.CarModel,
                        [
                            DbRelationship.BrandHasCarModel,
                        ],
                    ],
                    [
                        NodeTypeLabel.Image,
                        [
                            DbRelationship.NodeHasImage,
                        ],
                    ],
                ])
            ],
            [
                NodeTypeLabel.CarModel, new Map(
                [
                    [
                        NodeTypeLabel.Image,
                        [
                            DbRelationship.NodeHasImage,
                            DbRelationship.CarModelHasPrimeImage,
                        ],
                    ],
                ])
            ],
            [
                NodeTypeLabel.Image, new Map(
                [])
            ],
        ])
}
