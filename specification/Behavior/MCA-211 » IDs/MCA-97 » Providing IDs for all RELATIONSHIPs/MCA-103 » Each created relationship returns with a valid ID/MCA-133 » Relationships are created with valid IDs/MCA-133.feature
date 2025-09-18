@REQ_MCA-97
Feature: Providing IDs for all RELATIONSHIPs
  As an API consumer\
  I need all RELATIONSHIPs to have an IDENTIFIER\
  So I can find the RELATIONSHIPs again to reference them in different contexts

  @RULE_MCA-103
  Rule: Each created relationship returns with a valid ID

    @TEST_MCA-133 @implemented
    Scenario: Relationships are created with valid IDs
      When the user creates a relationship
      Then the property "relationship_id" in the response should be a number greater than 0
      And the property "relationship_id" in the response should be a number lesser than 4294967296
