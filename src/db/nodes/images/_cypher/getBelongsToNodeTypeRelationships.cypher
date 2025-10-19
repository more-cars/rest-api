MATCH (a:Image {mc_id: $imageId})-[r:HAS_IMAGE]-(b:targetNodeLabel)
RETURN a, r, b
