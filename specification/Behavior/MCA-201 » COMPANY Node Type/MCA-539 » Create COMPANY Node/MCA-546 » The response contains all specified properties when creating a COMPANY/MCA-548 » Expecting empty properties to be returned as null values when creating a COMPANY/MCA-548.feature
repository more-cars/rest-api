@REQ_MCA-539
Feature: Create COMPANY Node
  As an API contributor
  I want to be able to create COMPANY nodes
  So I can fill gaps in the database

  @RULE_MCA-546
  Rule: The response contains all specified properties when creating a COMPANY

    @TEST_MCA-548 @implemented
    Scenario: Expecting empty properties to be returned as null values when creating a COMPANY
      When the user creates a "COMPANY" "BMW AG" with the following data
        | key  | value  | datatype |
        | name | BMW AG | string   |
      Then the response should contain the following properties
        | key                         | value  | datatype |
        | name                        | BMW AG | string   |
        | founded                     |        | number   |
        | defunct                     |        | number   |
        | headquarters_location       |        | string   |
        | legal_headquarters_location |        | string   |
