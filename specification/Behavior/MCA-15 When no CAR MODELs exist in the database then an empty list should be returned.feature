@REQ_MCA-3
Feature: Requesting all CAR MODEL nodes

  @RULE_MCA-13
  Rule: When no CAR MODELs exist in the database then an empty list is returned

  @TEST_MCA-15
  Scenario: When no CAR MODELs exist in the database then an empty list should be returned
    Given there exist NO car models
    When the user requests all car models
    Then the response should return a collection of 0 car models
    And the response should return with status code 200
