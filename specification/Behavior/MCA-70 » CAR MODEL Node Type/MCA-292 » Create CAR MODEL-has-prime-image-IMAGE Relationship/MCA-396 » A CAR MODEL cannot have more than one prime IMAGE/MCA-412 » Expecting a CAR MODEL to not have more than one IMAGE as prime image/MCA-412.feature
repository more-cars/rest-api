@REQ_MCA-292
Feature: Create CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to be able to select one IMAGE for a CAR MODEL to be used as prime image\
  So the node has an ideal visual representation in any frontend application

  @RULE_MCA-396
  Rule: A CAR MODEL cannot have more than one prime IMAGE

    @TEST_MCA-412 @implemented
    Scenario: Expecting a CAR MODEL to not have more than one IMAGE as prime image
      Given there exists a "CAR MODEL" "Mondeo"
      And there exists an "IMAGE" "front-left.jpg"
      And there exists an "IMAGE" "rear-spoiler.jpg"
      When the user requests to connect "front-left.jpg" to "Mondeo" as prime image
      And the user requests to connect "rear-spoiler.jpg" to "Mondeo" as prime image
      Then there should exist exactly one "has prime image" relationship for "Mondeo"
