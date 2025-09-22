@REQ_MCA-563
Feature: Hard Delete COMPANY Node
  As an API contributor
  I want to be able to delete a COMPANY
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-566
  Rule: Requests are rejected when there exists no COMPANY with the provided ID

    @TEST_MCA-567 @implemented
    Scenario: Trying to hard-delete a non-existing COMPANY
      Given "COMPANY" "Dr. Ing. h.c. F. Porsche AG" does NOT exist
      When the user hard-deletes the "COMPANY" "Dr. Ing. h.c. F. Porsche AG"
      Then the request should be rejected with status code 404
