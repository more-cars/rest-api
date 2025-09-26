@REQ_MCA-20
Feature: Create BRAND-has-car-model Relationship
  As an API contributor\
  I want to be able to connect CAR MODELs to a BRAND\
  So I can create car families

  @RULE_MCA-58
  Rule: The same ›has-car-model‹ relationship between the same nodes can only be created once

    @TEST_MCA-64 @implemented
    Scenario: Trying to create the same ›has-car-model‹ relationship again
      Given there exists a "BRAND" "VW"
      And there exists a "CAR MODEL" "Jetta"
      And there exists a "has-car-model" relationship between "VW" and "Jetta"
      When the user creates a "has-car-model" relationship between "VW" and "Jetta"
      Then the response should return with status code 304
      And the response should return an empty body
