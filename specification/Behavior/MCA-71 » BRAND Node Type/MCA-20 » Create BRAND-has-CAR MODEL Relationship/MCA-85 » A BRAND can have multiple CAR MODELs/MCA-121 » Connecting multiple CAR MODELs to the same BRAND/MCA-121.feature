@REQ_MCA-20
Feature: Create BRAND-has-CAR MODEL Relationship
  As an API contributor\
  I want to be able to connect CAR MODELs to a BRAND\
  So I can create car families


  @RULE_MCA-85
  Rule: A BRAND can have multiple CAR MODELs

  @TEST_MCA-121 @implemented
  Scenario: Connecting multiple CAR MODELs to the same BRAND
    Given there exists a "BRAND" "Mitsubishi"
    Then BRAND "Mitsubishi" should be connected to 0 CAR MODELs
    When the user connects 3 CAR MODELs to BRAND "Mitsubishi"
    Then BRAND "Mitsubishi" should be connected to 3 CAR MODELs
