@REQ_MCA-84
Feature: Providing IDs for all NODEs
  As an API consumer\
  I need all NODEs to have an IDENTIFIER\
  So I can find the NODEs again to reference them in different contexts

  @RULE_MCA-102
  Rule: Each node is created with a different ID

    @TEST_MCA-130 @implemented
    Scenario Outline: Each node gets a different ID
      When the user creates a set of 20 "<node type>"s
      Then each node in the response should contain a different ID

      Examples:
        | node type |
        | COMPANY   |
        | BRAND     |
        | CAR MODEL |
        | IMAGE     |
