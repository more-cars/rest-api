@REQ_MCA-558
Feature: Get all COMPANY Nodes
  As an API consumer
  I want to be able to load all COMPANIES at once
  So I can find out which even exist
  And to be able to compare and analyze them without having to load them all individually

  @RULE_MCA-561
  Rule: An empty list is returned when there exist no COMPANIES

    @TEST_MCA-562 @implemented
    Scenario: Requesting all COMPANY nodes when none exist
      Given there exist 0 "COMPANY"s
      When the user requests all "COMPANY"s
      Then the response should return a collection of 0 "COMPANY"s
      And the response should return with status code 200
