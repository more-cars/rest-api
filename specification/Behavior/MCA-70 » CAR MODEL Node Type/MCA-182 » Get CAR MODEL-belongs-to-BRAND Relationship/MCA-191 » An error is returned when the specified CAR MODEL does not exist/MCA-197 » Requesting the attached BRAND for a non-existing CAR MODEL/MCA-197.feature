@REQ_MCA-182
Feature: Get CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to know to which BRAND a specific CAR MODEL is connected to\
  So I can verify the correctness of the relationship

  @RULE_MCA-191
  Rule: An error is returned when the specified CAR MODEL does not exist

    @TEST_MCA-197 @implemented
    Scenario: Requesting the attached BRAND for a non-existing CAR MODEL
      Given "CAR MODEL" "Yaris" does NOT exist
      When the user requests the "belongs to brand" relationship for "Yaris"
      Then the response should return with status code 404
