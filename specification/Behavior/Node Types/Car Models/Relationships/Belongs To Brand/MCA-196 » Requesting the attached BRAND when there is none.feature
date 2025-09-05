@REQ_MCA-182
Feature: Requesting BRAND to which a specific CAR MODEL belongs
  As an API contributor
  I want to know to which BRAND a specific CAR MODEL is connected
  So I can verify the correctness of the relationship

  @RULE_MCA-190
  Rule: An error is returned when there is no BRAND attached

  @TEST_MCA-196 @implemented
  Scenario: Requesting the attached BRAND when there is none
    Given there exists a "CAR MODEL" "Yaris"
    And there exists NO "has brand" relationship "R" for "Yaris"
    When the user requests the BRAND that is attached to the CAR MODEL "Yaris"
    Then the response should return with status code 200
    And the response should return an empty body
