@REQ_MCA-563
Feature: Hard Delete COMPANY Node
  As an API contributor
  I want to be able to delete a COMPANY
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-564
  Rule: Hard-deleting a COMPANY permanently deletes it

    @TEST_MCA-565 @implemented
    Scenario: Hard-deleting an existing COMPANY
      Given there exists a "COMPANY" "Dr. Ing. h.c. F. Porsche AG"
      When the user hard-deletes the "COMPANY" "Dr. Ing. h.c. F. Porsche AG"
      Then the response should return with status code 204
      And the "COMPANY" "Dr. Ing. h.c. F. Porsche AG" should not exist anymore
