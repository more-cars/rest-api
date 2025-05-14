@REQ_MCA-20
Feature: Connecting CAR MODELs to a BRAND
  As an API contributor
  I want to be able to connect CAR MODELs to a BRAND
  So I can create car families

  @RULE_MCA-57
  Rule: Connecting a CAR MODEL to a different BRAND removes the original connection

  @TEST_MCA-63 @implemented
  Scenario: Connecting a CAR MODEL to a different BRAND should remove the original relationship
    Given there exists a car model "A"
    And there exists a brand "B"
    And there exists a relationship between car model "A" and brand "B"

    When the user connects car model "A" to a different brand
    And the relationship between car model "A" and brand "B" should not exist anymore
