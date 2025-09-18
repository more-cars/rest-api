@REQ_MCA-234
Feature: 8-digit IDs
  As a user\
  I want the NODE IDs to be short enough \
  So I can remember them\
  But long enough \
  So they can be used as meaningful search terms

  @RULE_MCA-245
  Rule: Custom IDs are not allowed when creating a NODE

    @TEST_MCA-259 @implemented
    Scenario Outline: Trying to add a custom ID when creating a NODE
      When the user creates a "<node_type>" with the following data
        | key            | value  |
        | name           | Test   |
        | image_provider | flickr |
        | external_id    | ABCD   |
        | id             | 1234   |
      Then the response should return with status code 201
      And the response should NOT contain the following properties
        | key | value |
        | id  | 1234  |

      Examples:
        | node_type |
        | COMPANY   |
        | BRAND     |
        | CAR MODEL |
        | IMAGE     |
