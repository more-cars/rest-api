@REQ_MCA-67
Feature: Providing timestamps for all RELATIONSHIPs
  As an API consumer\
  I want all RELATIONSHIPs to have timestamps\
  So I can assess how up-to-date the provided information is

  @RULE_MCA-106
  Rule: Each requested relationship returns with valid timestamps

    @TEST_MCA-128 @implemented
    Scenario: Requesting a relationship returns a response with valid timestamps
      Given there exists a relationship "R"
      When the user requests the relationship "R"
      Then the property "created_at" in the response should be an ISO 8601 formatted timestamp
      And the property "updated_at" in the response should be an ISO 8601 formatted timestamp
