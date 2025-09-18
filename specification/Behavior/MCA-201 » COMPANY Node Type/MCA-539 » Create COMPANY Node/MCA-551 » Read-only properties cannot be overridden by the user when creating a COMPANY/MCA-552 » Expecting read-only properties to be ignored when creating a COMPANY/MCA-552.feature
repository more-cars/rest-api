@REQ_MCA-539
Feature: Create COMPANY Node
  As an API contributor
  I want to be able to create COMPANY nodes
  So I can fill gaps in the database

  @RULE_MCA-551
  Rule: Read-only properties cannot be overridden by the user when creating a COMPANY

    @TEST_MCA-552 @implemented
    Scenario: Expecting read-only properties to be ignored when creating a COMPANY
      When the user creates a "COMPANY" "BMW AG" with the following data
        | key                         | value      | datatype |
        | name                        | BMW AG     | string   |
        | founded                     | 1916       | number   |
        | defunct                     |            | number   |
        | headquarters_location       | Munich     | string   |
        | legal_headquarters_location | Munich     | string   |
        | id                          | 1234       | number   |
        | created_at                  | 2025-01-01 | string   |
        | updated_at                  | 2025-01-01 | string   |
      Then the response should contain the following keys
        | key        |
        | id         |
        | created_at |
        | updated_at |
      But the response should NOT contain the following properties
        | key        | value      | datatype |
        | id         | 1234       | number   |
        | created_at | 2025-01-01 | string   |
        | updated_at | 2025-01-01 | string   |
