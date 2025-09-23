@REQ_MCA-79
Feature: Hard Delete IMAGE Node
  As an API contributor\
  I want to be able to delete an IMAGE\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-350
  Rule: Hard deleting an IMAGE does permanently delete it

    @TEST_MCA-361 @implemented
    Scenario: Hard deleting an IMAGE
      Given there exists an "IMAGE" "logo"
      When the user hard-deletes the "IMAGE" "logo"
      Then the "IMAGE" "logo" should not exist anymore
