@REQ_MCA-19
Feature: Get all BRAND Nodes
  As an API consumer \
  I want to be able to load all BRANDs\
  So I can compare and analyze them without loading each individually

  @RULE_MCA-42
  Rule: When no BRANDs exist in the database then an empty list is returned

    @TEST_MCA-51 @implemented
    Scenario: An empty list should be returned when there exist no BRANDs to be fetched
      Given there exist 0 "BRAND"s
      When the user requests all "BRAND"s
      Then the response should return a collection of 0 "BRAND"s
      And the response should return with status code 200
