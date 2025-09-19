@REQ_MCA-242
Feature: Get all BRAND-has-IMAGE Relationships
  As an API consumer\
  I want to get all IMAGEs that are attached to a BRAND\
  So I can see their logo (resp. their different logos over the time)

  @RULE_MCA-279
  Rule: An error is returned when the specified BRAND does not exist

    @TEST_MCA-282 @implemented
    Scenario: Requesting the attached IMAGEs for a BRAND that does not exist
      Given "BRAND" "Maserati" does NOT exist
      When the user requests all IMAGEs that are connected to BRAND "Maserati"
      Then the response should return with status code 404
