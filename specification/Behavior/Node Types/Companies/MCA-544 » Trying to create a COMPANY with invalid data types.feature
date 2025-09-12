Feature: Dummy

  @RULE_MCA-542
  Rule: Requests to create a COMPANY are rejected when the provided data is invalid

  @TEST_MCA-544 @implemented
  Scenario: Trying to create a COMPANY with invalid data types
    When the user tries to create a "COMPANY" "BMW AG" with the following data
      | key                         | value  | datatype |
      | name                        | BMW AG | boolean  |
      | founded                     | 1916   | boolean  |
      | defunct                     |        | boolean  |
      | headquarters_location       | Munich | boolean  |
      | legal_headquarters_location | Munich | boolean  |
    Then the response should return with status code 400
