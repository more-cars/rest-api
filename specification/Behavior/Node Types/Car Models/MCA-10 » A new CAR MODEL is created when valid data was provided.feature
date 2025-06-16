@REQ_MCA-1
Feature: Creating CAR MODEL nodes

  @RULE_MCA-8
  Rule: A new CAR MODEL is created when valid data was provided

  @TEST_MCA-10 @implemented
  Scenario: A new CAR MODEL is created when valid data was provided
    When the user creates a car model "A" with the following valid data
      | key  | value      |
      | name | Testarossa |
    Then the response should return the car model "A"
    And the response should return with status code 201
    When the user requests the car model "A" via ID
    Then the response should return the car model "A"
