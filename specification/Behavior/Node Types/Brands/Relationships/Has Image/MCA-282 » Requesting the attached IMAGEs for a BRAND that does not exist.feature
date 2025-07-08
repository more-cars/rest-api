@REQ_MCA-242
Feature: Get Relationships: BRAND has IMAGE
  As an API consumer
  I want to get all IMAGEs that are attached to a BRAND
  So I can see their logo (resp. their different logos over the time)

  @RULE_MCA-277
  Rule: A list of all attached IMAGEs can be requested

  @TEST_MCA-282 @implemented
  Scenario: Requesting the attached IMAGEs for a BRAND that does not exist
    Given "BRAND" "Maserati" does NOT exist
    When the user tries to fetch all IMAGEs that are connected to BRAND "Maserati"
    Then the response should return with status code 404
