CREATE (n:$nodeLabel {
$nodeProperties,
  created_at: '$timestamp',
  updated_at: '$timestamp'
})
RETURN n
  LIMIT 1
