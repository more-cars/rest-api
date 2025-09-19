@REQ_MCA-18
Feature: Create BRAND Node
  As an API contributor\
  I want to be able to create BRANDs\
  So I can fill gaps in the database

  @RULE_MCA-36
  Rule: All BRAND-specific node properties are returned when creating a BRAND

    @TEST_MCA-45 @implemented
    Scenario: Expecting all BRAND-specific properties to be included in the "create brand" response
      When the user creates a "BRAND"
      Then the response should contain the following keys
        | key       |
        | id        |
        | name      |
        | full_name |
        | founded   |
        | defunct   |
        | wmi       |
        | hsn       |
