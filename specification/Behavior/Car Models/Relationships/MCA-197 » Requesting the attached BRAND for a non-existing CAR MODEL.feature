@REQ_MCA-182
Feature: Requesting BRAND to which a specific CAR MODEL belongs
  As an API contributor
  I want to know to which BRAND a specific CAR MODEL is connected
  So I can verify the correctness of the relationship

  @RULE_MCA-190
  Rule: An error is returned when there is no BRAND attached

  @TEST_MCA-197 @implemented
  Scenario: Requesting the attached BRAND for a non-existing CAR MODEL
    Given "CAR MODEL" "Yaris" does NOT exist
    When the user tries to request the BRAND that is attached to the CAR MODEL "Yaris"
    Then the response should return with status code 404
