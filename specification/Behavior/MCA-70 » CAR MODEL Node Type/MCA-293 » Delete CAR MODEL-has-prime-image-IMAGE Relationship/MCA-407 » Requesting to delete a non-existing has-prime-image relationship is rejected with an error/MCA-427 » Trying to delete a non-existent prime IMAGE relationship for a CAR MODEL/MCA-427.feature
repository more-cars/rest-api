@REQ_MCA-293
Feature: Delete CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to be able to detach the prime IMAGE from a CAR MODEL\
  So I can clean up bad data or test data

  @RULE_MCA-407
  Rule: Requesting to delete a non-existing has-prime-image relationship is rejected with an error

    @TEST_MCA-427
    Scenario: Trying to delete a non-existent prime IMAGE relationship for a CAR MODEL
      Given there exists a "CAR MODEL" "Mondeo"
      And there exists an "IMAGE" "front-left.jpg"
      And there exists no prime "IMAGE" relationship between "Mondeo" and "front-left.jpg"
      When the user requests to delete the prime "IMAGE" relationship between "Mondeo" and "front-left.jpg"
      Then the request should be rejected with status code 404
