@REQ_MCA-20
Feature: Create BRAND-has-car-model Relationship
  As an API contributor\
  I want to be able to connect CAR MODELs to a BRAND\
  So I can create car families

  @RULE_MCA-85
  Rule: Each BRAND can be in a ›has-car-model‹ relationship with multiple CAR MODELS

    @TEST_MCA-121 @implemented
    Scenario: Creating multiple ›has-car-model‹ relationships
      Given there exists a "BRAND" "VW"
      And there exists a "CAR MODEL" "Jetta"
      And there exists a "CAR MODEL" "Jetta (Alternative)"
      When the user creates a "has-car-model" relationship between "VW" and "Jetta"
      And the user creates a "has-car-model" relationship between "VW" and "Jetta (Alternative)"
      Then there should exist a "has-car-model" relationship between "VW" and "Jetta"
      And there should exist a "has-car-model" relationship between "VW" and "Jetta (Alternative)"
