@REQ_MCA-75
Feature: Create IMAGE Node
  As an API contributor\
  I want to be able to create IMAGE nodes\
  So I can later use them to illustrate other nodes

  @RULE_MCA-113
  Rule: The response for creating an IMAGE returns the new node with all specified properties

    @TEST_MCA-141 @implemented
    Scenario: All specified properties are returned when an IMAGE was created
      When the user creates an "IMAGE"
      Then the response should contain the following keys
        | key                |
        | external_id        |
        | image_provider     |
        | name               |
        | description        |
        | creator            |
        | license            |
        | tags               |
        | source             |
        | image_url_original |
        | image_url_xxl      |
        | image_url_xl       |
        | image_url_l        |
        | image_url_m        |
        | image_url_s        |
        | image_url_xs       |
