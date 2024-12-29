@REQ_MCA-1
Feature: Creating CAR MODEL nodes

  @RULE_MCA-9
  Rule: The creation of a new CAR MODEL is aborted with an error message when invalid data was provided

  @TEST_MCA-11
  Scenario: The creation of a new CAR MODEL is aborted with an error message when invalid data was provided
    When the user creates a car model with the following INVALID data
      | attribute | value      |
      | mc_id     | 12345      |
      | bad_name  | Testarossa |
    And the response should return with status code 422
