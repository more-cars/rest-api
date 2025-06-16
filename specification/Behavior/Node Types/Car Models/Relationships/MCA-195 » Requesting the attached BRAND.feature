@REQ_MCA-182
Feature: Requesting BRAND to which a specific CAR MODEL belongs
  As an API contributor
  I want to know to which BRAND a specific CAR MODEL is connected
  So I can verify the correctness of the relationship

  @RULE_MCA-189
  Rule: The attached BRAND is returned

  @TEST_MCA-195 @implemented
  Scenario: Requesting the attached BRAND
    Given there exists a "CAR MODEL" "Yaris"
    And there exists a "BRAND" "Toyota"
    And there exists a relationship "R" between CAR MODEL "Yaris" and BRAND "Toyota"
    When the user requests the BRAND that is attached to the CAR MODEL "Yaris"
    Then the response should return with status code 200
    And the response should return the relationship "R"
