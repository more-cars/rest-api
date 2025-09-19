@REQ_MCA-285
Feature: Get BRAND-has-CAR MODEL Relationship by ID
  As an API contributor\
  I want to be able to request the relationship between a BRAND and a CAR MODEL\
  So I can find out if they are already connected or not

  @RULE_MCA-326
  Rule: The relationship between BRAND and CAR MODEL is returned when it exists

    @TEST_MCA-329 @implemented
    Scenario: Requesting the relationship between a specific BRAND and a specific CAR MODEL
      Given there exists a "BRAND" "Lamborghini"
      And there exists a "CAR MODEL" "Countach"
      And there exists a relationship "R" between "BRAND" "Lamborghini" and "CAR MODEL" "Countach"
      When the user requests the relationship between "BRAND" "Lamborghini" and "CAR MODEL" "Countach"
      Then the response should return with status code 200
      And the response should return the relationship "R"
