@REQ_MCA-18
Feature: Create BRAND Node
  As an API contributor\
  I want to be able to create BRANDs\
  So I can fill gaps in the database


  @RULE_MCA-35
  Rule: BRAND creation is aborted when invalid data was provided

  @TEST_MCA-44 @implemented
  Scenario: Trying to create a BRAND with invalid data
    When the user tries to create a brand with the following data
    | attribute | value   |
    | bad_name  | Ferrari |
    Then the response should return with status code 400
