@REQ_MCA-97
Feature: Providing IDs for all RELATIONSHIPs
  As an API consumer\
  I need all RELATIONSHIPs to have an IDENTIFIER\
  So I can find the RELATIONSHIPs again to reference them in different contexts

  @RULE_MCA-104
  Rule: Each requested relationship returns with a valid ID

    @TEST_MCA-134 @implemented
    Scenario: Requesting a collections of relationships returns with valid IDs
      Given there exist 5 relationships
      When the user requests a relationship
      Then the relationship ID in the response should be a number greater than 0
      And the relationship ID in the response should be a number smaller than 4294967296
      When the user requests all relationships
      Then the relationship ID of all items in the response should be a number greater than 0
      And the relationship ID of all items in the response should be a number smaller than 4294967296
