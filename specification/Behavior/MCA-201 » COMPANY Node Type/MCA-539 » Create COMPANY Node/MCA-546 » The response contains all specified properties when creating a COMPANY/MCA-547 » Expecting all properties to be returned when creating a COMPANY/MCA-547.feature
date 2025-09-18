@REQ_MCA-539
Feature: Create COMPANY Node
  As an API contributor
  I want to be able to create COMPANY nodes
  So I can fill gaps in the database

  @RULE_MCA-546
  Rule: The response contains all specified properties when creating a COMPANY

    @TEST_MCA-547 @implemented
    Scenario: Expecting all properties to be returned when creating a COMPANY
      When the user creates a "COMPANY" "BMW AG" with the following data
        | key                         | value  | datatype |
        | name                        | BMW AG | string   |
        | founded                     | 1916   | number   |
        | defunct                     |        | number   |
        | headquarters_location       | Munich | string   |
        | legal_headquarters_location | Munich | string   |
      Then the response should contain the following properties
        | key                         | value  | datatype |
        | name                        | BMW AG | string   |
        | founded                     | 1916   | number   |
        | defunct                     |        | number   |
        | headquarters_location       | Munich | string   |
        | legal_headquarters_location | Munich | string   |
