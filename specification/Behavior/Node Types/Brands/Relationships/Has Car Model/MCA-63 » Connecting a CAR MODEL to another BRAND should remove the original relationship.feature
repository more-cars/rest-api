@REQ_MCA-20
Feature: Connecting CAR MODELs to a BRAND
  As an API contributor
  I want to be able to connect CAR MODELs to a BRAND
  So I can create car families

  @RULE_MCA-57
  Rule: Connecting a CAR MODEL to a different BRAND removes the original connection

  @TEST_MCA-63 @implemented
  Scenario: Connecting a CAR MODEL to a different BRAND should remove the original relationship
    Given there exists a "CAR MODEL" "Veyron"
    And there exists a "BRAND" "Bugatti"
    And there exists a relationship "R" between "CAR MODEL" "Veyron" and "BRAND" "Bugatti"

    When the user connects CAR MODEL "Veyron" to a different BRAND
    And the relationship "R" should not exist anymore
