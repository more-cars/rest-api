@REQ_MCA-2
Feature: Requesting a CAR MODEL node by its ID

  @RULE_MCA-5
  Rule: Requesting an invalid CAR MODEL results in a NOT FOUND response

  @TEST_MCA-7
  Scenario: Requesting a CAR MODEL with an invalid ID should return a 404 response
    When the user requests a non-existing car model
    Then the response should have a 404 status code
