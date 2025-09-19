@REQ_MCA-292
Feature: Create CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to be able to select one IMAGE for a CAR MODEL to be used as prime image\
  So the node has an ideal visual representation in any frontend application

  @RULE_MCA-395
  Rule: Connecting a different prime IMAGE to the CAR MODEL deletes the previous has-prime-image relationship

    @TEST_MCA-411 @implemented
    Scenario: Expecting the previous relationship to be deleted  when connecting a different IMAGE as prime image to a CAR MODEL
      Given there exists a "CAR MODEL" "Mondeo"
      And there exists an "IMAGE" "front-left.jpg"
      And there exists an "IMAGE" "rear-spoiler.jpg"
      And there exists a "has prime image" relationship "prime" between "Mondeo" and "front-left.jpg"
      When the user requests to connect "rear-spoiler.jpg" to "Mondeo" as prime image
      Then the request should be confirmed with status code 201
      And the response should NOT return the relationship "prime"
