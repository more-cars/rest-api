@REQ_MCA-20
Feature: Create BRAND-has-CAR MODEL Relationship
  As an API contributor\
  I want to be able to connect CAR MODELs to a BRAND\
  So I can create car families

  @RULE_MCA-58
  Rule: The same relationship between the same nodes can only exist once

    @TEST_MCA-64 @implemented
    Scenario: Creating the same relationship again returns the already existing one
      Given there exists a "BRAND" "A"
      And there exists a "CAR MODEL" "B"
      And there exists a relationship "C" between "CAR MODEL" "B" and "BRAND" "A"
      When the user connects "CAR MODEL" "B" to "BRAND" "A"
      And the response should contain the id of relationship "C"
