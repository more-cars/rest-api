@REQ_MCA-18
Feature: Create BRAND Node
  As an API contributor\
  I want to be able to create BRANDs\
  So I can fill gaps in the database

  @RULE_MCA-36
  Rule: All BRAND-specific node properties are returned when creating a BRAND

    @TEST_MCA-47 @implemented
    Scenario: Expecting all BRAND properties to be saved as provided
      When the user creates a BRAND "DKW" with the following valid data
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
