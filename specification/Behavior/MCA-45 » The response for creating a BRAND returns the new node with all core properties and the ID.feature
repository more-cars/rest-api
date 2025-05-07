@REQ_MCA-18
Feature: Creating BRAND nodes
  As an API contributor
  I want to be able to create BRANDs
  So I can fill gaps in the database

  @RULE_MCA-36
  Rule: The response for creating a BRAND returns the new node with all core properties and the ID

  @TEST_MCA-45 @implemented
  Scenario: The response for creating a BRAND returns the new node with all core properties and the ID
    When the user creates a brand
    Then the response should contain the following keys
      | key       |
      | id        |
      | name      |
      | full_name |
      | founded   |
      | defunct   |
      | wmi       |
      | hsn       |
