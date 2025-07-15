@REQ_MCA-239
Feature: Create Relationship: CAR MODEL has IMAGE
  As an API contributor
  I want to be able to attach IMAGEs to CAR MODELs
  So I can illustrate them

  @RULE_MCA-250
  Rule: A 404 error is returned when any of the two nodes does not exist

  @TEST_MCA-255 @implemented
  Scenario: Creating the same relationship again
    Given there exists a "CAR MODEL" "Impreza"
    And there exists an "IMAGE" "rear spoiler"
    And there exists a relationship "R" between CAR MODEL "Impreza" and IMAGE "rear spoiler"

    When the user connects IMAGE "rear spoiler" to CAR MODEL "Impreza"
    And the response should contain the id of relationship "R"
