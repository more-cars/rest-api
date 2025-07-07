@REQ_MCA-18
Feature: Creating BRAND nodes
  As an API contributor
  I want to be able to create BRANDs
  So I can fill gaps in the database

  @RULE_MCA-35
  Rule: The creation of a new BRAND is aborted with an error message when invalid data was provided

  @TEST_MCA-44 @implemented
  Scenario: The creation of a new BRAND is aborted with an error message when invalid data was provided
    When the user tries to create a BRAND with the following data
      | attribute | value   |
      | bad_name  | Ferrari |
    Then the response should return with status code 400
