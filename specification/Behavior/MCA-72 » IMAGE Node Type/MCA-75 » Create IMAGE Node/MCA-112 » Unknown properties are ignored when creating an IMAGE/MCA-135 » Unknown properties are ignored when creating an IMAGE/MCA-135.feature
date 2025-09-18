@REQ_MCA-75
Feature: Create IMAGE Node
  As an API contributor\
  I want to be able to create IMAGE nodes\
  So I can later use them to illustrate other nodes

  @RULE_MCA-112
  Rule: Unknown properties are ignored when creating an IMAGE

    @TEST_MCA-135 @implemented
    Scenario: Unknown properties are ignored when creating an IMAGE
      When the user creates an "IMAGE" with the following data
        | key            | value  |
        | image_provider | flickr |
        | external_id    | 12345  |
        | my_property    | ABC    |
      Then the response should return with status code 201
      But the response should NOT contain the following keys
        | key         |
        | my_property |
