@REQ_MCA-234
Feature: 8-digit IDs
  As a user\
  I want the NODE IDs to be short enough \
  So I can remember them\
  But long enough \
  So they can be used as meaningful search terms

  @RULE_MCA-247
  Rule: Updating a NODE does not change its ID

    @TEST_MCA-261
    Scenario Outline: Updating NODEs of every type
      Given there exists a "<node_type>" "A"
      When the user updates node "A"
      Then the response should return with status code 201
      And the response should contain the id of node "A"

      Examples:
        | node_type |
        | brand     |
        | car model |
        | image     |
