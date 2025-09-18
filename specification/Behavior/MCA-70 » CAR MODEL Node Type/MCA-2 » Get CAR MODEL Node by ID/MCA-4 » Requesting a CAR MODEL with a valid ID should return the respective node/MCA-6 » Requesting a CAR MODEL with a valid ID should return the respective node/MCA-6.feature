@REQ_MCA-2
Feature: Get CAR MODEL Node by ID
  As an API consumer \
  When I have the ID of an unknown car model\
  I want to be able to load that car model\
  So I can find out the name and its other properties

  @RULE_MCA-4
  Rule: Requesting a CAR MODEL with a valid ID should return the respective node

    @TEST_MCA-6 @implemented
    Scenario: Requesting a CAR MODEL with a valid ID should return the respective node
      Given there exists a "car model" "A"
      When the user requests the "CAR MODEL" "A"
      Then the response should return the CAR MODEL "A"
      And the response should return with status code 200
