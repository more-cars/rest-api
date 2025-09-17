@REQ_MCA-3
Feature: Get all CAR MODEL Nodes
  As an API consumer \
  I want to be able to load all car models\
  So I can compare and analyze them without loading each individually

  @RULE_MCA-12
  Rule: Requesting a CAR MODEL collection returns an (unordered) list of all existing CAR MODEL nodes

    @TEST_MCA-14 @implemented
    Scenario: Requesting a CAR MODEL collection should return an (unordered) list of all existing CAR MODEL nodes
      Given there exist 12 car models
      When the user requests all car models
      Then the response should return a collection of 12 car models
      And the response should return with status code 200
