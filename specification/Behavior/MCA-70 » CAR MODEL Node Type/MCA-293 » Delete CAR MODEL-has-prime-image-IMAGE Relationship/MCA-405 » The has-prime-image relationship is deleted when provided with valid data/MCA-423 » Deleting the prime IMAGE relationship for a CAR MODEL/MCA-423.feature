@REQ_MCA-293
Feature: Delete CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to be able to detach the prime IMAGE from a CAR MODEL\
  So I can clean up bad data or test data

  @RULE_MCA-405
  Rule: The has-prime-image relationship is deleted when provided with valid data

    @TEST_MCA-423
    Scenario: Deleting the prime IMAGE relationship for a CAR MODEL
      Given there exists a "CAR MODEL" "Mondeo"
      And there exists an "IMAGE" "front-left.jpg"
      And there exists a prime "IMAGE" relationship "prime" between "Mondeo" and "front-left.jpg"
      When the user requests to delete the prime "IMAGE" relationship between "Mondeo" and "front-left.jpg"
      Then the response should return with status code 204
