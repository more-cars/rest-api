@REQ_MCA-20
Feature: Connecting CAR MODELs to a BRAND
  As an API contributor
  I want to be able to connect CAR MODELs to a BRAND
  So I can create car families

  @RULE_MCA-58
  Rule: The same relationship between the same nodes can only exist once

  @TEST_MCA-64 @implemented
  Scenario: Creating the same relationship again returns the already existing one
    Given there exists a "brand" "A"
    And there exists a "car model" "B"
    And there exists a relationship "C" between car model "B" and brand "A"

    When the user connects car model "B" to brand "A"
    And the response should contain the id of relationship "C"
