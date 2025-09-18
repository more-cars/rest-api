@REQ_MCA-16
Feature: Providing every CORE information for a CAR MODEL
  As an API consumer\
  I want to get every core information for a car model\
  So I am not limited to its ID and name

  @RULE_MCA-25
  Rule: Requesting a CAR MODEL always returns all CORE properties

    @TEST_MCA-29 @implemented
    Scenario: Empty CORE properties should be returned as NULL value
      Given there exists a minimal CAR MODEL "Octavia"
      When the user requests the "CAR MODEL" "Octavia"
      Then the following keys in the response object should be of value null
        | key              |
        | built_from       |
        | built_to         |
        | generation       |
        | internal_code    |
        | total_production |
