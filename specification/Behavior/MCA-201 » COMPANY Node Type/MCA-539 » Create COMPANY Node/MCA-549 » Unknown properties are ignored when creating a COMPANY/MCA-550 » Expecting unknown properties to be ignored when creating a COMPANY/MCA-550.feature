@REQ_MCA-539
Feature: Create COMPANY Node
  As an API contributor
  I want to be able to create COMPANY nodes
  So I can fill gaps in the database

  @RULE_MCA-549
  Rule: Unknown properties are ignored when creating a COMPANY

    @TEST_MCA-550 @implemented
    Scenario: Expecting unknown properties to be ignored when creating a COMPANY
      When the user creates a "COMPANY" "BMW AG" with the following data
        | key                         | value  | datatype |
        | name                        | BMW AG | string   |
        | founded                     | 1916   | number   |
        | defunct                     |        | number   |
        | headquarters_location       | Munich | string   |
        | legal_headquarters_location | Munich | string   |
        | thimbleweed                 | park   | string   |
      Then the response should contain the following properties
        | key                         | value  | datatype |
        | name                        | BMW AG | string   |
        | founded                     | 1916   | number   |
        | defunct                     |        | number   |
        | headquarters_location       | Munich | string   |
        | legal_headquarters_location | Munich | string   |
      And the response should NOT contain the following keys
        | key         |
        | thimbleweed |
