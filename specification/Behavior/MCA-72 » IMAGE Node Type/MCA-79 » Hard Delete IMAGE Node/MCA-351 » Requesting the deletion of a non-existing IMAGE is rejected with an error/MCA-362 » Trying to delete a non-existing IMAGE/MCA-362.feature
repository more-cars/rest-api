@REQ_MCA-79
Feature: Hard Delete IMAGE Node
  As an API contributor\
  I want to be able to delete an IMAGE\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-351
  Rule: Requesting the deletion of a non-existing IMAGE is rejected with an error

    @TEST_MCA-362 @implemented
    Scenario: Trying to delete a non-existing IMAGE
      Given "IMAGE" "logo" does NOT exist
      When the user hard-deletes the "IMAGE" "logo"
      Then the response should return with status code 404
