@REQ_MCA-239
Feature: Create CAR MODEL-has-IMAGE Relationship
  As an API contributor\
  I want to be able to attach IMAGEs to CAR MODELs\
  So I can illustrate them

  @RULE_MCA-249
  Rule: Any existing IMAGE can be connected to any existing CAR MODEL

    @TEST_MCA-253 @implemented
    Scenario: Connecting an IMAGE to a CAR MODEL
      Given there exists a "CAR MODEL" "Impreza"
      And there exists an "IMAGE" "rear spoiler"
      When the user connects "IMAGE" "rear spoiler" to "CAR MODEL" "Impreza"
      Then the response should return with status code 201
