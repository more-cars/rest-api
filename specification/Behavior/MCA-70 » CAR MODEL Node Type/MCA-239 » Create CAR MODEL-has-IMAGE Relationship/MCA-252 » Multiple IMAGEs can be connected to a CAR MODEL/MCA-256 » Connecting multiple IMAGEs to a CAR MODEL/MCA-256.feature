@REQ_MCA-239
Feature: Create CAR MODEL-has-IMAGE Relationship
  As an API contributor\
  I want to be able to attach IMAGEs to CAR MODELs\
  So I can illustrate them


  @RULE_MCA-252
  Rule: Multiple IMAGEs can be connected to a CAR MODEL

  @TEST_MCA-256 @implemented
  Scenario: Connecting multiple IMAGEs to a CAR MODEL
    Given there exists a "CAR MODEL" "Impreza"
    And there exists an "IMAGE" "rear spoiler"
    And there exists an "IMAGE" "bonnet"
    And there exists an "IMAGE" "interior"

    When the user attaches the IMAGE "rear spoiler" to the CAR MODEL "Impreza"
    And the user attaches the IMAGE "bonnet" to the CAR MODEL "Impreza"
    And the user attaches the IMAGE "interior" to the CAR MODEL "Impreza"

    Then IMAGE "rear spoiler" should be connected to CAR MODEL "Impreza"
    And IMAGE "bonnet" should be connected to CAR MODEL "Impreza"
    And IMAGE "interior" should be connected to CAR MODEL "Impreza"
