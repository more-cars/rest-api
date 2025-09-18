@REQ_MCA-16
Feature: Providing every CORE information for a CAR MODEL
  As an API consumer\
  I want to get every core information for a car model\
  So I am not limited to its ID and name

  @RULE_MCA-26
  Rule: Valid CORE property are saved when creating a CAR MODEL

    @TEST_MCA-30 @implemented
    Scenario: Valid CORE properties should be saved when creating a CAR MODEL
      When the user creates a CAR MODEL "Test Car" with the following valid data
        | key              | value    |
        | name             | Test Car |
        | built_from       | 1988     |
        | built_to         | 1999     |
        | generation       | 1        |
        | internal_code    | F99      |
        | total_production | 222222   |
      Then the response should contain the following data
        | key              | value    |
        | name             | Test Car |
        | built_from       | 1988     |
        | built_to         | 1999     |
        | generation       | 1        |
        | internal_code    | F99      |
        | total_production | 222222   |
