@REQ_MCA-90
Feature: Hard Delete BRAND Node
  As an API contributor\
  I want to be able to delete a BRAND\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-348
  Rule: Requesting the deletion of a non-existing BRAND is rejected with an error

    @TEST_MCA-359 @implemented
    Scenario: Trying to delete a non-existing BRAND
      Given "BRAND" "Kia" does NOT exist
      When the user hard-deletes the "BRAND" "Kia"
      Then the response should return with status code 404
