@REQ_MCA-539
Feature: Create COMPANY Node
  As an API contributor
  I want to be able to create COMPANY nodes
  So I can fill gaps in the database

  @RULE_MCA-540
  Rule: Requests to create a COMPANY are accepted when the provided data is valid

    @TEST_MCA-541 @implemented
    Scenario: Creating a COMPANY with valid data
      When the user creates a "COMPANY" "BMW AG" with the following data
        | key                         | value  | datatype |
        | name                        | BMW AG | string   |
        | founded                     | 1916   | number   |
        | defunct                     |        | number   |
        | headquarters_location       | Munich | string   |
        | legal_headquarters_location | Munich | string   |
      Then the response should return the "COMPANY" "BMW AG"
      And the response should return with status code 201
