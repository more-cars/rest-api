@REQ_MCA-388
Feature: Has CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to find out if a specific IMAGE is already attached as prime image to a specific CAR MODEL\
  So I can find gaps in the database

  @RULE_MCA-404
  Rule: Requesting a non-existing has-prime-image relationship is rejected with an error

    @TEST_MCA-422 @implemented
    Scenario: Trying to request a non-existent prime IMAGE relationship for a CAR MODEL
      Given there exists a "CAR MODEL" "Mondeo"
      And there exists an "IMAGE" "front-left.jpg"
      And there exists NO "has prime image" relationship "R" between "Mondeo" and "front-left.jpg"
      When the user requests the "has prime image" relationship between "Mondeo" and "front-left.jpg"
      Then the request should be rejected with status code 404
