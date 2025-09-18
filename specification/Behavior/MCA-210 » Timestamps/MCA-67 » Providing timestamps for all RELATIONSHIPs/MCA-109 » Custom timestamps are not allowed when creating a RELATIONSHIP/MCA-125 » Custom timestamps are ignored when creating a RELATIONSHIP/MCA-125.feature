@REQ_MCA-67
Feature: Providing timestamps for all RELATIONSHIPs
  As an API consumer\
  I want all RELATIONSHIPs to have timestamps\
  So I can assess how up-to-date the provided information is

  @RULE_MCA-109
  Rule: Custom timestamps are not allowed when creating a RELATIONSHIP

    @TEST_MCA-125 @implemented
    Scenario: Custom timestamps are ignored when creating a RELATIONSHIP
      When the user creates a relationship with the following data
        | key        | value                |
        | created_at | 2022-07-23T03:00:00Z |
        | updated_at | 2022-07-23T03:00:00Z |
      Then the response should return with status code 201
      And the response should NOT contain the following properties
        | key        | value                |
        | updated_at | 2022-07-23T03:00:00Z |
        | created_at | 2022-07-23T03:00:00Z |
