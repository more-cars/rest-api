@REQ_MCA-179
Feature: Create CAR MODEL-belongs-to-BRAND Relationship
  As an API contributor\
  I want to be able to connect a BRAND to CAR MODELs\
  So I can create car families

  @RULE_MCA-86
  Rule: A CAR MODEL can belong to max. one BRAND

    @TEST_MCA-122 @implemented
    Scenario: Connecting different BRANDs to the same CAR MODEL
      Given there exists a "CAR MODEL" "Asterion"
      And there exists a "BRAND" "Bugatti"
      And there exists a "BRAND" "Chevrolet"
      When the user connects "BRAND" "Bugatti" to "CAR MODEL" "Asterion"
      And the CAR MODEL "Asterion" should be connected to the BRAND "Bugatti"
      When the user connects "BRAND" "Chevrolet" to "CAR MODEL" "Asterion"
      And the CAR MODEL "Asterion" should be connected to the BRAND "Chevrolet"
      And the CAR MODEL "Asterion" should NOT be connected to the BRAND "Bugatti"
