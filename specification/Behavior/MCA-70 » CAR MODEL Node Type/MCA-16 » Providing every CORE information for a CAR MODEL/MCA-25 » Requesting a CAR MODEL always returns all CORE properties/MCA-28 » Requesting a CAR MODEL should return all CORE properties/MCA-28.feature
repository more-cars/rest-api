@REQ_MCA-16
Feature: Providing every CORE information for a CAR MODEL
  As an API consumer\
  I want to get every core information for a car model\
  So I am not limited to its ID and name

  @RULE_MCA-25
  Rule: Requesting a CAR MODEL always returns all CORE properties

    @TEST_MCA-28 @implemented
    Scenario: Requesting a CAR MODEL should return all CORE properties
      Given there exists a "CAR MODEL" "Golf"
      When the user requests the "CAR MODEL" "Golf"
      Then the response should contain the following keys
        | key              |
        | name             |
        | built_from       |
        | built_to         |
        | generation       |
        | internal_code    |
        | total_production |
      Given there exist 10 "CAR MODEL"s
      When the user requests all "CAR MODEL"s
      Then the response should contain the following keys for each node
        | key              |
        | name             |
        | built_from       |
        | built_to         |
        | generation       |
        | internal_code    |
        | total_production |
      When the user creates a "CAR MODEL"
      Then the response should contain the following keys
        | key              |
        | name             |
        | built_from       |
        | built_to         |
        | generation       |
        | internal_code    |
        | total_production |
