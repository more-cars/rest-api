@REQ_MCA-623
Feature: Create COMPANY-has-brand Relationship

  @RULE_MCA-626
  Rule: Requests to create a ›has-brand‹ relationship are rejected when the provided data is invalid

    @TEST_MCA-627 @implemented
    Scenario: Trying to create a ›has-brand‹ relationship with invalid IDs
      Given there exists a "COMPANY" "Volkswagen AG"
      And "BRAND" "VW" does NOT exist
      When the user creates a "has-brand" relationship between "Volkswagen AG" and "VW"
      Then the request should be rejected with status code 404
      Given "COMPANY" "Volkswagen AG" does NOT exist
      And there exists a "BRAND" "VW"
      When the user creates a "has-brand" relationship between "Volkswagen AG" and "VW"
      Then the request should be rejected with status code 404
      Given "COMPANY" "Volkswagen AG" does NOT exist
      And "BRAND" "VW" does NOT exist
      When the user creates a "has-brand" relationship between "Volkswagen AG" and "VW"
      Then the request should be rejected with status code 404
