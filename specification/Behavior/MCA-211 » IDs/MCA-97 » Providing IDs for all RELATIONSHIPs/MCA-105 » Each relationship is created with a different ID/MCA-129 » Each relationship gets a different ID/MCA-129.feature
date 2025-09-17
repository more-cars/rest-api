@REQ_MCA-97
Feature: Providing IDs for all RELATIONSHIPs
  As an API consumer\
  I need all RELATIONSHIPs to have an IDENTIFIER\
  So I can find the RELATIONSHIPs again to reference them in different contexts

  @RULE_MCA-105
  Rule: Each relationship is created with a different ID

    @TEST_MCA-129 @implemented
    Scenario: Each relationship gets a different ID
      When the user creates a set of 20 relationships "R"
      Then each relationship in the set "R" should contain a different ID
