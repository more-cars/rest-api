@REQ_MCA-179
Feature: Create CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to be able to connect a BRAND to CAR MODELs\
  So I can create car families

  @RULE_MCA-181
  Rule: Connecting another BRAND to a CAR MODEL removes the original connection

    @TEST_MCA-185 @implemented
    Scenario: Connecting another BRAND to a CAR MODEL should remove the original relationship
      Given there exists a "CAR MODEL" "Testarossa"
      And there exists a "BRAND" "Ferrari"
      And there exists a relationship "R" between "CAR MODEL" "Testarossa" and "BRAND" "Ferrari"
      When the user connects CAR MODEL "Testarossa" to a different BRAND
      And the relationship "R" should not exist anymore
