@REQ_MCA-2
Feature: Requesting a CAR MODEL node by its ID

  @RULE_MCA-5
  Rule: Requesting an invalid CAR MODEL results in a NOT FOUND response

  @TEST_MCA-7 @implemented
  Scenario: Requesting a CAR MODEL with an invalid ID should return a 404 response
    When the user requests a non-existing "CAR MODEL"
    Then the response should return with status code 404
