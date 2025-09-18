@REQ_MCA-17
Feature: Providing timestamps for all NODEs
  As an API consumer\
  I want all nodes to have timestamps\
  So I can assess how up-to-date the provided information is

  @RULE_MCA-23
  Rule: Custom timestamps are not allowed when creating a NODE

    @TEST_MCA-33 @implemented
    Scenario Outline: The user should not be able to provide custom timestamps when creating a NODE
      When the user creates a "<node type>" with the following data
        | key            | value                |
        | name           | Test                 |
        | image_provider | Test                 |
        | external_id    | Test                 |
        | created_at     | 2022-07-23T03:00:00Z |
        | updated_at     | 2022-07-23T03:00:00Z |
      Then the response should return with status code 201
      And the response should NOT contain the following properties
        | key        | value                |
        | updated_at | 2022-07-23T03:00:00Z |
        | created_at | 2022-07-23T03:00:00Z |

      Examples:
        | node type |
        | COMPANY   |
        | BRAND     |
        | CAR MODEL |
        | IMAGE     |
