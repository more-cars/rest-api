@REQ_MCA-241
Feature: Get all CAR MODEL-has-IMAGE Relationships
  As an API consumer\
  I want to get all IMAGEs that are attached to a CAR MODEL\
  So I can get a visual representation of it

  @RULE_MCA-265
  Rule: An error is returned when the specified CAR MODEL does not exist

    @TEST_MCA-268 @implemented
    Scenario: Requesting the attached IMAGEs for a CAR MODEL that does not exist
      Given "CAR MODEL" "Jetta" does NOT exist
      When the user requests all IMAGEs that are connected to CAR MODEL "Jetta"
      Then the response should return with status code 404
