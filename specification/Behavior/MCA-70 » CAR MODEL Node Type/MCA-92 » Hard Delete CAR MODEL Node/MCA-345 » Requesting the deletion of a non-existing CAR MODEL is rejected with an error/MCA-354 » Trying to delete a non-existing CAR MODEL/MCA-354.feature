@REQ_MCA-92
Feature: Hard Delete CAR MODEL Node
  As an API contributor\
  I want to be able to delete a CAR MODEL\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-345
  Rule: Requesting the deletion of a non-existing CAR MODEL is rejected with an error

    @TEST_MCA-354 @implemented
    Scenario: Trying to delete a non-existing CAR MODEL
      Given "CAR MODEL" "Avensis" does NOT exist
      When the user hard-deletes the "CAR MODEL" "Avensis"
      Then the response should return with status code 404
