@REQ_MCA-179
Feature: Create CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to be able to connect a BRAND to CAR MODELs\
  So I can create car families

  @RULE_MCA-180
  Rule: Any existing BRAND can be connected to any existing CAR MODEL

    @TEST_MCA-184 @implemented
    Scenario: The user should be able to connect an existing BRAND to any existing CAR MODEL
      Given there exists a "CAR MODEL" "Testarossa"
      And there exists a "BRAND" "Ferrari"
      When the user connects "BRAND" "Ferrari" to "CAR MODEL" "Testarossa"
      Then the response should return with status code 201
