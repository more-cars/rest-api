@REQ_MCA-234
Feature: 8-digit IDs
  As a user\
  I want the NODE IDs to be short enough \
  So I can remember them\
  But long enough \
  So they can be used as meaningful search terms

  @RULE_MCA-243
  Rule: NODEs are created with 8-digit IDs

    @TEST_MCA-257 @implemented
    Scenario Outline: Creating NODEs of each type
      When the user creates a "<node type>"
      Then the property "id" in the response should be a number greater than 11999999
      And the property "id" in the response should be a number lesser than 99999999

      Examples:
        | node type |
        | COMPANY   |
        | BRAND     |
        | CAR MODEL |
        | IMAGE     |
