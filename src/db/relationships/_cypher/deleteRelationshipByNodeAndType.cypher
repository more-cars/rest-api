MATCH (a {mc_id: $nodeId})-[r:relationshipName]->()
DELETE r
