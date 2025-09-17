@REQ_MCA-294
Feature: Get CAR MODEL-has-prime-image Relationship
  As an API consumer\
  I want to be able to request the prime IMAGE for a CAR MODEL\
  So I can represent the node in the best possible form in the frontend\
  (Because I don't know which one from the image gallery is the best one)

  @RULE_MCA-401
  Rule: Requests are rejected with an error when the provided data is invalid

    @TEST_MCA-416 @implemented
    Scenario: Trying to request a prime IMAGE relationship for a non-existent CAR MODEL
      Given "CAR MODEL" "Mondeo" does NOT exist
      When the user requests the "has prime image" relationship for "Mondeo"
      Then the request should be rejected with status code 404
