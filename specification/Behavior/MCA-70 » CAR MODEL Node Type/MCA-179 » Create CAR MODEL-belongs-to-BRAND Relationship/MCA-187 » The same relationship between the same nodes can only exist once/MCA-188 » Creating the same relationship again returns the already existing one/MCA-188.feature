@REQ_MCA-179
Feature: Create CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to be able to connect a BRAND to CAR MODELs\
  So I can create car families

  @RULE_MCA-187
  Rule: The same relationship between the same nodes can only exist once

    @TEST_MCA-188 @implemented
    Scenario: Creating the same relationship again returns the already existing one
      Given there exists a "CAR MODEL" "Testarossa"
      And there exists a "BRAND" "Ferrari"
      And there exists a relationship "R" between "CAR MODEL" "Testarossa" and "BRAND" "Ferrari"
      When the user connects "BRAND" "Ferrari" to "CAR MODEL" "Testarossa"
      And the response should contain the id of relationship "R"
