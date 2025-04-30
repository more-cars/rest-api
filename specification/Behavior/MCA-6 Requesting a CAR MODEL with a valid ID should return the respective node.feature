@REQ_MCA-2
Feature: Requesting a CAR MODEL node by its ID

  @RULE_MCA-4
  Rule: Requesting a CAR MODEL with a valid ID should return the respective node

  @TEST_MCA-6 @implemented
  Scenario: Requesting a CAR MODEL with a valid ID should return the respective node
    Given there exists a car model A
    When the user requests the car model A via ID
    Then the response should return the car model A
    And the response should return with status code 200
