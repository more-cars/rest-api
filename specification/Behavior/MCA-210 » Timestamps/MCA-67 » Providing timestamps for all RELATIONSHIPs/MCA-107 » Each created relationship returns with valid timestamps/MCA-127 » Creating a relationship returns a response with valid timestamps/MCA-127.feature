@REQ_MCA-67
Feature: Providing timestamps for all RELATIONSHIPs
  As an API consumer\
  I want all RELATIONSHIPs to have timestamps\
  So I can assess how up-to-date the provided information is

  @RULE_MCA-107
  Rule: Each created relationship returns with valid timestamps

    @TEST_MCA-127 @implemented
    Scenario: Creating a relationship returns a response with valid timestamps
      When the user creates a relationship
      Then the property "created_at" in the response should be an ISO 8601 formatted timestamp
      And the property "updated_at" in the response should be an ISO 8601 formatted timestamp
