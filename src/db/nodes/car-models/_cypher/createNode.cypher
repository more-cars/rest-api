CREATE (node:CarModel {
  name:             $name,
  built_from:       $built_from,
  built_to:         $built_to,
  generation:       $generation,
  internal_code:    $internal_code,
  total_production: $total_production
})
RETURN node
  LIMIT 1
