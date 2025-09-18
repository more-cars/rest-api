@REQ_MCA-75
Feature: Create IMAGE Node
  As an API contributor\
  I want to be able to create IMAGE nodes\
  So I can later use them to illustrate other nodes

  @RULE_MCA-116
  Rule: When creating an IMAGE the read-only properties cannot be overridden by the user

    @TEST_MCA-140 @implemented
    Scenario: Trying to override read-only properties when creating an IMAGE
      When the user creates an "IMAGE" with the following data
        | key                | value                |
        | image_provider     | flickr               |
        | external_id        | 12345                |
        | id                 | 123                  |
        | name               | TEST                 |
        | description        | TEST                 |
        | creator            | TEST                 |
        | license            | TEST                 |
        | tags               | TEST                 |
        | source             | TEST                 |
        | image_url_original | TEST                 |
        | image_url_xxl      | TEST                 |
        | image_url_xl       | TEST                 |
        | image_url_l        | TEST                 |
        | image_url_m        | TEST                 |
        | image_url_s        | TEST                 |
        | image_url_xs       | TEST                 |
        | created_at         | 2022-07-23T03:00:00Z |
        | updated_at         | 2022-07-23T03:00:00Z |
      Then the response should return with status code 201
      And the response should NOT contain the following properties
        | key                | value                |
        | id                 | 123                  |
        | name               | TEST                 |
        | description        | TEST                 |
        | creator            | TEST                 |
        | license            | TEST                 |
        | tags               | TEST                 |
        | source             | TEST                 |
        | image_url_original | TEST                 |
        | image_url_xxl      | TEST                 |
        | image_url_xl       | TEST                 |
        | image_url_l        | TEST                 |
        | image_url_m        | TEST                 |
        | image_url_s        | TEST                 |
        | image_url_xs       | TEST                 |
        | created_at         | 2022-07-23T03:00:00Z |
        | updated_at         | 2022-07-23T03:00:00Z |
