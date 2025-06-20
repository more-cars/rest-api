@REQ_MCA-1
Feature: Creating CAR MODEL nodes

  @RULE_MCA-9
  Rule: The creation of a new CAR MODEL is aborted with an error message when invalid data was provided

  @TEST_MCA-11 @implemented
  Scenario: The creation of a new CAR MODEL is aborted with an error message when invalid data was provided
    When the user tries to create a car model with the following data
      | attribute | value      |
      | bad_name  | Testarossa |
    Then the response should return with status code 400
