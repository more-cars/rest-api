@REQ_MCA-84
Feature: Providing IDs for all NODEs
  As an API consumer\
  I need all NODEs to have an IDENTIFIER\
  So I can find the NODEs again to reference them in different contexts

  @RULE_MCA-100
  Rule: Each created node returns with a valid ID

    @TEST_MCA-131 @implemented
    Scenario Outline: Nodes are created with valid IDs
      When the user creates a "<node type>"
      Then the property "id" in the response should be a number greater than 0
      And the property "id" in the response should be a number lesser than 4294967296

      Examples:
        | node type |
        | COMPANY   |
        | BRAND     |
        | CAR MODEL |
        | IMAGE     |
