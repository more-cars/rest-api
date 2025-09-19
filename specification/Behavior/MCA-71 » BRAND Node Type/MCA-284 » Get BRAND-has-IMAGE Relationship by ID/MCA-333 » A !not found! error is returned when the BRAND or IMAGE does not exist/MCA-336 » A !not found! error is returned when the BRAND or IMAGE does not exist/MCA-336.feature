@REQ_MCA-284
Feature: Get BRAND-has-IMAGE Relationship by ID
  As an API contributor\
  I want to be able to request the relationship between a BRAND and an IMAGE\
  So I can find out if they are already connected or not

  @RULE_MCA-333
  Rule: A "not found" error is returned when the BRAND or IMAGE does not exist

    @TEST_MCA-336 @implemented
    Scenario: A "not found" error is returned when the BRAND or IMAGE does not exist
      Given there exists a "BRAND" "Honda"
      And "IMAGE" "logo" does NOT exist
      When the user requests the relationship between "BRAND" "Honda" and "IMAGE" "logo"
      Then the response should return with status code 404
      Given "BRAND" "Honda" does NOT exist
      And there exists an "IMAGE" "logo"
      When the user requests the relationship between "BRAND" "Honda" and "IMAGE" "logo"
      Then the response should return with status code 404
      Given "BRAND" "Honda" does NOT exist
      And "IMAGE" "logo" does NOT exist
      When the user requests the relationship between "BRAND" "Honda" and "IMAGE" "logo"
      Then the response should return with status code 404
