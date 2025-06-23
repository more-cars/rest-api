CREATE (node:Image {
  image_provider:     $image_provider,
  external_id:        $external_id,
  name:               $name,
  description:        $description,
  creator:            $creator,
  license:            $license,
  tags:               $tags,
  source:             $source,
  image_url_original: $image_url_original,
  image_url_xxl:      $image_url_xxl,
  image_url_xl:       $image_url_xl,
  image_url_l:        $image_url_l,
  image_url_m:        $image_url_m,
  image_url_s:        $image_url_s,
  image_url_xs:       $image_url_xs
})
RETURN node
  LIMIT 1
