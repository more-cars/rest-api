@REQ_MCA-285
Feature: Get BRAND-has-CAR MODEL Relationship by ID
  As an API contributor\
  I want to be able to request the relationship between a BRAND and a CAR MODEL\
  So I can find out if they are already connected or not

  @RULE_MCA-327
  Rule: A "not found" error is returned when the BRAND or CAR MODEL does not exist

    @TEST_MCA-330 @implemented
    Scenario: Requesting the relationship between a BRAND and CAR MODEL that do not exist
      Given there exists a "BRAND" "Lamborghini"
      And "CAR MODEL" "Countach" does NOT exist
      When the user requests the relationship between "BRAND" "Lamborghini" and "CAR MODEL" "Countach"
      Then the response should return with status code 404
      Given "BRAND" "Lamborghini" does NOT exist
      And there exists a "CAR MODEL" "Countach"
      When the user requests the relationship between "BRAND" "Lamborghini" and "CAR MODEL" "Countach"
      Then the response should return with status code 404
      Given "BRAND" "Lamborghini" does NOT exist
      And "CAR MODEL" "Countach" does NOT exist
      When the user requests the relationship between "BRAND" "Lamborghini" and "CAR MODEL" "Countach"
      Then the response should return with status code 404
