@REQ_MCA-182
Feature: Get CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to know to which BRAND a specific CAR MODEL is connected to\
  So I can verify the correctness of the relationship

  @RULE_MCA-189
  Rule: The attached BRAND is returned

    @TEST_MCA-195 @implemented
    Scenario: Requesting the attached BRAND
      Given there exists a "CAR MODEL" "Yaris"
      And there exists a "BRAND" "Toyota"
      And there exists a relationship "R" between "BRAND" "Toyota" and "CAR MODEL" "Yaris"
      When the user requests the "belongs to brand" relationship for "Yaris"
      Then the response should return with status code 200
      And the response should return the relationship "R"
