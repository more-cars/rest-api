@REQ_MCA-20
Feature: Connecting CAR MODELs to a BRAND
  As an API contributor
  I want to be able to connect CAR MODELs to a BRAND
  So I can create car families

  @RULE_MCA-54
  Rule: Any existing CAR MODEL can be connected to any existing BRAND

  @TEST_MCA-60 @implemented
  Scenario: The user should be able to connect an existing CAR MODEL to any existing BRAND
    Given there exists a "brand" "A"
    And there exists a "car model" "B"

    When the user connects car model "B" to brand "A"
    Then the response should return with status code 201

    When the user connects brand "A" to car model "B"
    Then the response should return with status code 201
