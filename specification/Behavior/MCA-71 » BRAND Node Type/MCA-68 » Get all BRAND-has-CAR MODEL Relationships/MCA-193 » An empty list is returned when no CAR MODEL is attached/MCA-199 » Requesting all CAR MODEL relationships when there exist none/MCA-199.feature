@REQ_MCA-68
Feature: Get all BRAND-has-CAR MODEL Relationships
  As an API consumer\
  I want to fetch the CAR MODELs that belong to a specific BRAND\
  So I can find out which models the BRAND has produced over the time

  @RULE_MCA-193
  Rule: An empty list is returned when no CAR MODEL is attached

    @TEST_MCA-199 @implemented
    Scenario: Requesting all CAR MODEL relationships when there exist none
      When the user creates a "BRAND" "Hyundai"
      And the user requests a list of all CAR MODEL relationships for the BRAND "Hyundai"
      Then the response should return with status code 200
      And the response should return an empty list
