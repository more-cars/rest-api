@REQ_MCA-20
Feature: Create BRAND-has-car-model Relationship
  As an API contributor\
  I want to be able to connect CAR MODELs to a BRAND\
  So I can create car families

  @RULE_MCA-55
  Rule: Requests to create a ›has-car-model‹ relationship are rejected when the provided data is invalid

    @TEST_MCA-635 @implemented
    Scenario: Trying to create a ›has-car-model‹ relationship where both IDs are invalid
      Given "BRAND" "VW" does NOT exist
      And "CAR MODEL" "Jetta" does NOT exist
      When the user creates a "has-car-model" relationship between "VW" and "Jetta"
      Then the request should be rejected with status code 404
