@REQ_MCA-19
Feature: Requesting all BRAND nodes
  As an API consumer
  I want to be able to load all BRANDs
  So I can compare and analyze them without loading each individually

  @RULE_MCA-41
  Rule: Requesting a BRAND collection returns a list of all existing BRAND nodes

  @TEST_MCA-50 @implemented
  Scenario: Requesting a BRAND collection should return a list of all existing BRAND nodes
    Given there exist 11 "BRAND"s
    When the user requests all "BRAND"s
    Then the response should return a collection of 11 BRANDs
    And the response should return with status code 200
