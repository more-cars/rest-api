@REQ_MCA-20
Feature: Connecting CAR MODELs to a BRAND
  As an API contributor
  I want to be able to connect CAR MODELs to a BRAND
  So I can create car families

  @RULE_MCA-55
  Rule: A 404 error is returned when any of the two nodes does not exist

  @TEST_MCA-61 @implemented
  Scenario: A 404 error should be returned when any of the two nodes does not exist
    Given there exists a "brand" "A"
    And "CAR MODEL" "B" does NOT exist
    When the user connects CAR MODEL "B" to BRAND "A"
    Then the response should return with status code 404

    Given "BRAND" "A" does NOT exist
    And there exists a "car model" "B"
    When the user connects CAR MODEL "B" to BRAND "A"
    Then the response should return with status code 404

    Given "BRAND" "A" does NOT exist
    And "CAR MODEL" "B" does NOT exist
    When the user connects CAR MODEL "B" to BRAND "A"
    Then the response should return with status code 404
