@REQ_MCA-3
Feature: Requesting all CAR MODEL nodes

  @RULE_MCA-13
  Rule: When no CAR MODELs exist in the database then an empty list is returned

  @TEST_MCA-15 @implemented
  Scenario: When no CAR MODELs exist in the database then an empty list should be returned
    Given there exist 0 "CAR MODEL"s
    When the user requests all "CAR MODEL"s
    Then the response should return a collection of 0 car models
    And the response should return with status code 200
