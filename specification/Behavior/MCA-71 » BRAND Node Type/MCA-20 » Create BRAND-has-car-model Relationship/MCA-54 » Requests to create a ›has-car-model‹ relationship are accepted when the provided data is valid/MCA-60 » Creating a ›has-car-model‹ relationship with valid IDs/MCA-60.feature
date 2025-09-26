@REQ_MCA-20
Feature: Create BRAND-has-car-model Relationship
  As an API contributor\
  I want to be able to connect CAR MODELs to a BRAND\
  So I can create car families

  @RULE_MCA-54
  Rule: Requests to create a ›has-car-model‹ relationship are accepted when the provided data is valid

    @TEST_MCA-60 @implemented
    Scenario: Creating a ›has-car-model‹ relationship with valid IDs
      Given there exists a "BRAND" "VW"
      And there exists a "CAR MODEL" "Jetta"
      When the user creates a "has-car-model" relationship between "VW" and "Jetta"
      Then the request should be confirmed with status code 201
      And the response should contain the following keys
        | key             |
        | brand_id        |
        | car_model_id    |
        | relationship_id |
