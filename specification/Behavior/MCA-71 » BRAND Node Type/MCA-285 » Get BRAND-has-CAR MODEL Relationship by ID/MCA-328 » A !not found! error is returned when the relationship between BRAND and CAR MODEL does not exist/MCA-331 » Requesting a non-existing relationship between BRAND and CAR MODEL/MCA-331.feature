@REQ_MCA-285
Feature: Get BRAND-has-CAR MODEL Relationship by ID
  As an API contributor\
  I want to be able to request the relationship between a BRAND and a CAR MODEL\
  So I can find out if they are already connected or not

  @RULE_MCA-328
  Rule: A "not found" error is returned when the relationship between BRAND and CAR MODEL does not exist

    @TEST_MCA-331 @implemented
    Scenario: Requesting a non-existing relationship between BRAND and CAR MODEL
      Given there exists a "BRAND" "Lamborghini"
      And there exists a "CAR MODEL" "Countach"
      And there exists NO "has car model" relationship "R" between "Lamborghini" and "Countach"
      When the user requests the relationship between "BRAND" "Lamborghini" and "CAR MODEL" "Countach"
      Then the response should return with status code 404
