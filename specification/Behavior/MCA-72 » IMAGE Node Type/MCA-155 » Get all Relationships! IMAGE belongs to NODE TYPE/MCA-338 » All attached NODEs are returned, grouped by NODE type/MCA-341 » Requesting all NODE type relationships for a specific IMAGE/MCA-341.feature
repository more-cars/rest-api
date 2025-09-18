@REQ_MCA-155
Feature: Get all Relationships: IMAGE belongs to NODE TYPE
  As an API consumer\
  I want to know all nodes an IMAGE is connected to\
  But the returned list should be grouped by NODE type\
  So I get a semantic perspective on the data

  @RULE_MCA-338
  Rule: All attached NODEs are returned, grouped by NODE type

    @TEST_MCA-341 @implemented
    Scenario: Requesting all NODE type relationships for a specific IMAGE
      Given there exists a "IMAGE" "bmw bonnet"
      And there exists a "BRAND" "BMW"
      And there exists a "CAR MODEL" "M3"
      And there exists a relationship "R1" between "IMAGE" "bmw bonnet" and "BRAND" "BMW"
      And there exists a relationship "R2" between "IMAGE" "bmw bonnet" and "CAR MODEL" "M3"
      When the user requests a grouped list of all relationships for the IMAGE "bmw bonnet"
      Then the response should return with status code 200
      And the response should contain a "BRAND" group
      And the response should contain a "CAR MODEL" group
      And the response should contain the relationship "R1" in the "BRAND" group
      And the response should contain the relationship "R2" in the "CAR MODEL" group
