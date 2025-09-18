@REQ_MCA-75
Feature: Create IMAGE Node
  As an API contributor\
  I want to be able to create IMAGE nodes\
  So I can later use them to illustrate other nodes

  @RULE_MCA-111
  Rule: The creation of a new IMAGE is aborted with an error message when malformed data was provided

    @TEST_MCA-137 @implemented
    Scenario: IMAGE creation is aborted when malformed data was provided
      When the user creates an "IMAGE" with the following data
        | key              | value  |
        | image_provvidder | flickr |
      Then the response should return with status code 400
      And the response should contain an error message
