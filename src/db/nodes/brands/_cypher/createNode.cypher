CREATE (node:Brand {
  name:      $name,
  full_name: $full_name,
  founded:   $founded,
  defunct:   $defunct,
  wmi:       $wmi,
  hsn:       $hsn
})
RETURN node
  LIMIT 1
