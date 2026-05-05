MATCH (n:$label {mc_id: $id})
SET n += {
$properties
}
RETURN n
  LIMIT 1
