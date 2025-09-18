@REQ_MCA-97
Feature: Providing IDs for all RELATIONSHIPs
  As an API consumer\
  I need all RELATIONSHIPs to have an IDENTIFIER\
  So I can find the RELATIONSHIPs again to reference them in different contexts

  @RULE_MCA-104
  Rule: Each requested relationship returns with a valid ID

    @TEST_MCA-233 @implemented
    Scenario: Requesting a specific relationship returns with a valid ID
      Given there exists an "BRAND" "Jaguar"
      And there exists an "IMAGE" "logo"
      And there exists a relationship "R" between "IMAGE" "logo" and "BRAND" "Jaguar"
      When the user requests the "belongs to node" relationship between "logo" and "Jaguar"
      Then the property "relationship_id" in the response should be a number greater than 0
      And the property "relationship_id" in the response should be a number lesser than 4294967296
