@REQ_MCA-239
Feature: Create Relationship: CAR MODEL has IMAGE
  As an API contributor
  I want to be able to attach IMAGEs to CAR MODELs
  So I can illustrate them

  @RULE_MCA-250
  Rule: A 404 error is returned when any of the two nodes does not exist

  @TEST_MCA-254 @implemented
  Scenario: Trying to connect non-existent nodes
    Given there exists a "CAR MODEL" "Impreza"
    And "IMAGE" "rear spoiler" does NOT exist
    When the user tries to connect IMAGE "rear spoiler" to CAR MODEL "Impreza"
    Then the response should return with status code 404

    Given "CAR MODEL" "Impreza" does NOT exist
    And there exists an "IMAGE" "rear spoiler"
    When the user tries to connect IMAGE "rear spoiler" to CAR MODEL "Impreza"
    Then the response should return with status code 404

    Given "CAR MODEL" "Impreza" does NOT exist
    And "IMAGE" "rear spoiler" does NOT exist
    When the user tries to connect IMAGE "rear spoiler" to CAR MODEL "Impreza"
    Then the response should return with status code 404
