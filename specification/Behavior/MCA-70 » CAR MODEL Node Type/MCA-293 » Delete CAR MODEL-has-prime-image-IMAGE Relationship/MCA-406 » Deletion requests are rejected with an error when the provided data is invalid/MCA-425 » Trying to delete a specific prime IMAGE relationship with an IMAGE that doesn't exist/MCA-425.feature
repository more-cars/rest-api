@REQ_MCA-293
Feature: Delete CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to be able to detach the prime IMAGE from a CAR MODEL\
  So I can clean up bad data or test data

  @RULE_MCA-406
  Rule: Deletion requests are rejected with an error when the provided data is invalid

    @TEST_MCA-425
    Scenario: Trying to delete a specific prime IMAGE relationship with an IMAGE that doesn't exist
      Given there exists a "CAR MODEL" "Mondeo"
      And an "IMAGE" "front-left.jpg" does not exist
      When the user requests to delete the prime "IMAGE" relationship between "Mondeo" and "front-left.jpg"
      Then the request should be rejected with status code 404
