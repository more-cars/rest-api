@REQ_MCA-179
Feature: Create CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to be able to connect a BRAND to CAR MODELs\
  So I can create car families

  @RULE_MCA-183
  Rule: A 404 error is returned when any of the two nodes does not exist

    @TEST_MCA-186 @implemented
    Scenario: Expecting an error when any of the two nodes does not exist
      Given there exists a "CAR MODEL" "Testarossa"
      And "BRAND" "Ferrari" does NOT exist
      When the user connects "BRAND" "Ferrari" to "CAR MODEL" "Testarossa"
      Then the response should return with status code 404
      Given "CAR MODEL" "Testarossa" does NOT exist
      And there exists a "CAR MODEL" "B"
      When the user connects "BRAND" "Ferrari" to "CAR MODEL" "Testarossa"
      Then the response should return with status code 404
      Given "CAR MODEL" "Testarossa" does NOT exist
      And "BRAND" "Ferrari" does NOT exist
      When the user connects "BRAND" "Ferrari" to "CAR MODEL" "Testarossa"
      Then the response should return with status code 404
