@REQ_MCA-20
Feature: Connecting CAR MODELs to a BRAND
  As an API contributor
  I want to be able to connect CAR MODELs to a BRAND
  So I can create car families

  @RULE_MCA-56
  Rule: A 404 error is returned when an invalid relationship name is used

  @TEST_MCA-62 @implemented
  Scenario: Using an invalid relationship name should result in a 404 error
    Given there exists a "brand" "A"
    And there exists a "car model" "B"
    When the user tries to connect CAR MODEL "B" to BRAND "A" with the relationship name "not-a-valid-relationship-name"
    Then the response should return with status code 404
