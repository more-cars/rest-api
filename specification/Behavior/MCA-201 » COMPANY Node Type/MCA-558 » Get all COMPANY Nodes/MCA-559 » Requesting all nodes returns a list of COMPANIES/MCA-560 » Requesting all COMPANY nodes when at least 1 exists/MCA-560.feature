@REQ_MCA-558
Feature: Get all COMPANY Nodes
  As an API consumer
  I want to be able to load all COMPANIES at once
  So I can find out which even exist
  And to be able to compare and analyze them without having to load them all individually

  @RULE_MCA-559
  Rule: Requesting all nodes returns a list of COMPANIES

    @TEST_MCA-560 @implemented
    Scenario: Requesting all COMPANY nodes when at least 1 exists
      Given there exist 3 "COMPANY"s
      When the user requests all "COMPANY"s
      Then the response should return a collection of 3 "COMPANY"s
      And the response should return with status code 200
