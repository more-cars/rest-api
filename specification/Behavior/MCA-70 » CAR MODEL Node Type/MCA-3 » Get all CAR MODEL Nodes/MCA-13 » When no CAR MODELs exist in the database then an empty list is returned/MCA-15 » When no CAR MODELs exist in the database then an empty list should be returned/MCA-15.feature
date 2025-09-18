@REQ_MCA-3
Feature: Get all CAR MODEL Nodes
  As an API consumer \
  I want to be able to load all car models\
  So I can compare and analyze them without loading each individually

  @RULE_MCA-13
  Rule: When no CAR MODELs exist in the database then an empty list is returned

    @TEST_MCA-15 @implemented
    Scenario: When no CAR MODELs exist in the database then an empty list should be returned
      Given there exist 0 "CAR MODEL"s
      When the user requests all "CAR MODEL"s
      Then the response should return a collection of 0 "CAR MODEL"s
      And the response should return with status code 200
