@REQ_MCA-18
Feature: Creating BRAND nodes
  As an API contributor
  I want to be able to create BRANDs
  So I can fill gaps in the database

  @RULE_MCA-36
  Rule: The response for creating a BRAND returns the new node with all core properties and the ID

  @TEST_MCA-47 @implemented
  Scenario: All property values should be saved exactly as provided by the user
    When the user creates a brand A with the following valid data
      | key       | value           |
      | name      | DKW             |
      | full_name | Dampfkraftwagen |
      | founded   | 1916            |
      | defunct   | 1966            |
      | wmi       | -               |
      | hsn       | 0010            |
    Then the response should contain the following data
      | key       | value           |
      | name      | DKW             |
      | full_name | Dampfkraftwagen |
      | founded   | 1916            |
      | defunct   | 1966            |
      | wmi       | -               |
      | hsn       | 0010            |
