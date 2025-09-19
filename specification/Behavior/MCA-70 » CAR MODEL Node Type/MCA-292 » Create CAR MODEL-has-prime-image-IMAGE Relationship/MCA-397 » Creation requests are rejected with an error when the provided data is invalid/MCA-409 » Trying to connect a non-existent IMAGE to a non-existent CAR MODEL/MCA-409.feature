@REQ_MCA-292
Feature: Create CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to be able to select one IMAGE for a CAR MODEL to be used as prime image\
  So the node has an ideal visual representation in any frontend application

  @RULE_MCA-397
  Rule: Creation requests are rejected with an error when the provided data is invalid

    @TEST_MCA-409 @implemented
    Scenario: Trying to connect a non-existent IMAGE to a non-existent CAR MODEL
      Given "CAR MODEL" "Mondeo" does NOT exist
      And "IMAGE" "front-left.jpg" does NOT exist
      When the user requests to connect "front-left.jpg" to "Mondeo" as prime image
      Then the request should be rejected with status code 404
