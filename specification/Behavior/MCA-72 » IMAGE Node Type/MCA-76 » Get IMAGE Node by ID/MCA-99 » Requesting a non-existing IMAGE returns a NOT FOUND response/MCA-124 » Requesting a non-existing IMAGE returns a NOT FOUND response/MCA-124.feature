@REQ_MCA-76
Feature: Get IMAGE Node by ID
  As an API consumer\
  I want to to be able to request a specific IMAGE node\
  So I can find out its URL to actually see the photo

  @RULE_MCA-99
  Rule: Requesting a non-existing IMAGE returns a NOT FOUND response

    @TEST_MCA-124 @implemented
    Scenario: Requesting a non-existing IMAGE returns a NOT FOUND response
      When the user requests a non-existing "IMAGE"
      Then the response should return with status code 404
