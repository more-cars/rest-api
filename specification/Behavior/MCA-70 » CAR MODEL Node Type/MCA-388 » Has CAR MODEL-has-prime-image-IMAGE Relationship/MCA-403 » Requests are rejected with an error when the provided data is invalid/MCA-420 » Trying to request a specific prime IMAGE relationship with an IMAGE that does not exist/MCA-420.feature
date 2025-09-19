@REQ_MCA-388
Feature: Has CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to find out if a specific IMAGE is already attached as prime image to a specific CAR MODEL\
  So I can find gaps in the database

  @RULE_MCA-403
  Rule: Requests are rejected with an error when the provided data is invalid

    @TEST_MCA-420 @implemented
    Scenario: Trying to request a specific prime IMAGE relationship with an IMAGE that does not exist
      Given there exists a "CAR MODEL" "Mondeo"
      And "IMAGE" "front-left.jpg" does NOT exist
      When the user requests the "has prime image" relationship between "Mondeo" and "front-left.jpg"
      Then the request should be rejected with status code 404
