@REQ_MCA-182
Feature: Get CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to know to which BRAND a specific CAR MODEL is connected to\
  So I can verify the correctness of the relationship


  @RULE_MCA-190
  Rule: An empty body is returned when there is no BRAND attached

  @TEST_MCA-196 @implemented
  Scenario: Requesting the attached BRAND when there is none
    Given there exists a "CAR MODEL" "Yaris"
    And there exists NO relationship between CAR MODEL "Yaris" and any BRAND
    When the user requests the BRAND that is attached to the CAR MODEL "Yaris"
    Then the response should return with status code 200
    And the response should return an empty body
