@REQ_MCA-68
Feature: Get all BRAND-has-CAR MODEL Relationships
  As an API consumer\
  I want to fetch the CAR MODELs that belong to a specific BRAND\
  So I can find out which models the BRAND has produced over the time

  @RULE_MCA-194
  Rule: An error is returned when the specified BRAND does not exist

    @TEST_MCA-200 @implemented
    Scenario: Requesting all CAR MODEL relationships when the BRAND does not exist
      Given "BRAND" "Hyundai" does NOT exist
      When the user requests a list of all CAR MODEL relationships for the BRAND "Hyundai"
      Then the response should return with status code 404
