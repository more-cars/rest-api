@REQ_MCA-623
Feature: Create COMPANY-has-brand Relationship
  As an API contributor\
  I want to be able to connect BRANDS to a COMPANY\
  So an API consumer can find out which BRANDS are owned by which COMPANY

  @RULE_MCA-626
  Rule: Requests to create a ›has-brand‹ relationship are rejected when the provided data is invalid

    @TEST_MCA-627 @implemented
    Scenario: Trying to create a ›has-brand‹ relationship with invalid COMPANY ID
      Given "COMPANY" "Volkswagen AG" does NOT exist
      And there exists a "BRAND" "VW"
      When the user creates a "has-brand" relationship between "Volkswagen AG" and "VW"
      Then the request should be rejected with status code 404
