@REQ_MCA-18
Feature: Create BRAND Node
  As an API contributor\
  I want to be able to create BRANDs\
  So I can fill gaps in the database

  @RULE_MCA-34
  Rule: BRAND is created when valid data was provided

    @TEST_MCA-43 @implemented
    Scenario: Creating a BRAND with valid data
      When the user creates a BRAND "DKW" with the following valid data
        | key       | value           |
        | name      | DKW             |
        | full_name | Dampfkraftwagen |
        | founded   | 1916            |
        | defunct   | 1966            |
        | wmi       | -               |
        | hsn       | 0010            |
      Then the response should return the BRAND "DKW"
      And the response should return with status code 201
      When the user requests the "BRAND" "DKW"
      Then the response should return the BRAND "DKW"
