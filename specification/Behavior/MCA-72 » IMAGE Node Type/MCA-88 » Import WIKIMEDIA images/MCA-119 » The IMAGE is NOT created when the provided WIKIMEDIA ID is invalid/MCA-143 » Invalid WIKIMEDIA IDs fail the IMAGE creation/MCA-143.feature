@REQ_MCA-88
Feature: Import WIKIMEDIA images
  As an API contributor\
  I want to import WIKIMEDIA images via their ID\
  So I don't have to fill out all fields manually

  @RULE_MCA-119
  Rule: The IMAGE is NOT created when the provided WIKIMEDIA ID is invalid

    @TEST_MCA-143
    Scenario: Invalid WIKIMEDIA IDs fail the IMAGE creation
      When the user tries to create an "IMAGE" with the following data
        | _key_          | _value_   |
        | image_platform | wikimedia |
        | external_id    | ABCDE     |
      Then the response should return with status code 422
