@REQ_MCA-241
Feature: Get all CAR MODEL-has-IMAGE Relationships
  As an API consumer\
  I want to get all IMAGEs that are attached to a CAR MODEL\
  So I can get a visual representation of it

  @RULE_MCA-263
  Rule: A list of all attached IMAGEs can be requested

    @TEST_MCA-266 @implemented
    Scenario: Requesting the attached IMAGEs
      Given there exists a "CAR MODEL" "Jetta"
      And there are 3 IMAGEs connected to CAR MODEL "Jetta"
      When the user requests all IMAGEs that are connected to CAR MODEL "Jetta"
      Then the response should return a collection with 3 relationships
