@REQ_MCA-75
Feature: Create IMAGE Node
  As an API contributor\
  I want to be able to create IMAGE nodes\
  So I can later use them to illustrate other nodes

  @RULE_MCA-110
  Rule: A new IMAGE is created when valid data was provided

    @TEST_MCA-136 @implemented
    Scenario: IMAGE is created when valid data was provided
      When the user creates an "IMAGE" with the following data
        | key            | value     |
        | image_provider | something |
        | external_id    | 12345     |
      Then the response should return with status code 201
      And the response should contain the following keys
        | key            |
        | id             |
        | image_provider |
        | external_id    |
