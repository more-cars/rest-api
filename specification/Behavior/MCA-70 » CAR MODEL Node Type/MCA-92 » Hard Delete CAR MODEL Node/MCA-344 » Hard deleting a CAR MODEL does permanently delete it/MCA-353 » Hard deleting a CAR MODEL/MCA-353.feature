@REQ_MCA-92
Feature: Hard Delete CAR MODEL Node
  As an API contributor\
  I want to be able to delete a CAR MODEL\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-344
  Rule: Hard deleting a CAR MODEL does permanently delete it

    @TEST_MCA-353 @implemented
    Scenario: Hard deleting a CAR MODEL
      Given there exists a "CAR MODEL" "Avensis"
      When the user hard-deletes the "CAR MODEL" "Avensis"
      Then the "CAR MODEL" "Avensis" should not exist anymore
