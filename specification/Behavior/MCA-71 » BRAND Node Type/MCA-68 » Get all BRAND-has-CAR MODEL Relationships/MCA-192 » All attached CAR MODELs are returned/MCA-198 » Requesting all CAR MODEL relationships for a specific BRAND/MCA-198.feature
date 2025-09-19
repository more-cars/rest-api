@REQ_MCA-68
Feature: Get all BRAND-has-CAR MODEL Relationships
  As an API consumer\
  I want to fetch the CAR MODELs that belong to a specific BRAND\
  So I can find out which models the BRAND has produced over the time

  @RULE_MCA-192
  Rule: All attached CAR MODELs are returned

    @TEST_MCA-198 @implemented
    Scenario: Requesting all CAR MODEL relationships for a specific BRAND
      Given there exists a "BRAND" "Hyundai"
      And there exists a "CAR MODEL" "i10"
      And there exists a "CAR MODEL" "i20"
      And there exists a relationship "R1" between "BRAND" "Hyundai" and "CAR MODEL" "i10"
      And there exists a relationship "R2" between "BRAND" "Hyundai" and "CAR MODEL" "i20"
      When the user requests a list of all CAR MODEL relationships for the BRAND "Hyundai"
      Then the response should return with status code 200
      And the response should contain the relationship "R1"
      And the response should contain the relationship "R2"
