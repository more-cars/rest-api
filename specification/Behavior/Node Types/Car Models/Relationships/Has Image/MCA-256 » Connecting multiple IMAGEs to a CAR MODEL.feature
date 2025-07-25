@REQ_MCA-239
Feature: Create Relationship: CAR MODEL has IMAGE
  As an API contributor
  I want to be able to attach IMAGEs to CAR MODELs
  So I can illustrate them

  @RULE_MCA-250
  Rule: A 404 error is returned when any of the two nodes does not exist

  @TEST_MCA-256 @implemented
  Scenario: Connecting multiple IMAGEs to a CAR MODEL
    Given there exists a "CAR MODEL" "Impreza"
    And there exists an "IMAGE" "rear spoiler"
    And there exists an "IMAGE" "bonnet"
    And there exists an "IMAGE" "interior"

    When the user connects IMAGE "rear spoiler" to CAR MODEL "Impreza"
    And the user connects IMAGE "bonnet" to CAR MODEL "Impreza"
    And the user connects IMAGE "interior" to CAR MODEL "Impreza"

    Then the IMAGE "rear spoiler" should be connected to the CAR MODEL "Impreza"
    And the IMAGE "bonnet" should be connected to the CAR MODEL "Impreza"
    And the IMAGE "interior" should be connected to the CAR MODEL "Impreza"
