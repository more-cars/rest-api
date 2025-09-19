@REQ_MCA-553
Feature: Get COMPANY Node by ID
  As an API consumer
  I want to be able to request a specific COMPANY
  So I can find out all the details about it when I only have its ID

  @RULE_MCA-556
  Rule: Requests are rejected when there exists no COMPANY with the provided ID

    @TEST_MCA-557 @implemented
    Scenario: Requesting a COMPANY with invalid ID
      When the user requests a non-existing "COMPANY"
      Then the request should be rejected with status code 404
