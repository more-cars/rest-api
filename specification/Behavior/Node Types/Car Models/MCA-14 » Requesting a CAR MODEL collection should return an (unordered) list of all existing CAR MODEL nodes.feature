@REQ_MCA-3
Feature: Requesting all CAR MODEL nodes

  @RULE_MCA-12
  Rule: Requesting a CAR MODEL collection returns an (unordered) list of all existing CAR MODEL nodes

  @TEST_MCA-14 @implemented
  Scenario: Requesting a CAR MODEL collection should return an (unordered) list of all existing CAR MODEL nodes
    Given there exist 12 "CAR MODEL"s
    When the user requests all "CAR MODEL"s
    Then the response should return a collection of 12 CAR MODELs
    And the response should return with status code 200
