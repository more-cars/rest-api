@REQ_MCA-623
Feature: Create COMPANY-has-brand Relationship
  As an API contributor\
  I want to be able to connect BRANDS to a COMPANY\
  So an API consumer can find out which BRANDS are owned by which COMPANY

  @RULE_MCA-624
  Rule: Requests to create a ›has-brand‹ relationship are accepted when the provided data is valid

    @TEST_MCA-625 @implemented
    Scenario: Creating a ›has-brand‹ relationship with valid IDs
      Given there exists a "COMPANY" "Volkswagen AG"
      And there exists a "BRAND" "VW"
      When the user creates a "has-brand" relationship between "Volkswagen AG" and "VW"
      Then the request should be confirmed with status code 201
      And the response should contain the following keys
        | key             |
        | company_id      |
        | brand_id        |
        | relationship_id |
