@REQ_MCA-234
Feature: 8-digit IDs
  As a user\
  I want the NODE IDs to be short enough \
  So I can remember them\
  But long enough \
  So they can be used as meaningful search terms

  @RULE_MCA-246
  Rule: Custom IDs are not allowed when updating a NODE

    @TEST_MCA-260
    Scenario Outline: Trying to add a custom ID when updating a NODE
      Given there exists a "<node_type>" "A"
      When the user updates node "A" with the following data
        | key | value |
        | id  | 1234  |
      Then the response should return with status code 201
      And the response should NOT contain the following properties
        | key | value |
        | id  | 1234  |

      Examples:
        | node_type |
        | brand     |
        | car model |
        | image     |
