@REQ_MCA-67
Feature: Providing timestamps for all RELATIONSHIPs
  As an API consumer\
  I want all RELATIONSHIPs to have timestamps\
  So I can assess how up-to-date the provided information is

  @RULE_MCA-108
  Rule: For never updated RELATIONSHIPs the two timestamps are identical

    @TEST_MCA-126 @implemented
    Scenario: In new relationships the "created" and "updated" timestamps are identical
      When the user creates a relationship
      Then the properties "created_at" and "updated_at" in the response should be identical
