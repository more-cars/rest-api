@REQ_MCA-90
Feature: Hard Delete BRAND Node
  As an API contributor\
  I want to be able to delete a BRAND\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-347
  Rule: Hard deleting a BRAND does permanently delete it

    @TEST_MCA-358 @implemented
    Scenario: Hard deleting a BRAND
      Given there exists a "BRAND" "Kia"
      When the user hard-deletes the "BRAND" "Kia"
      Then the "BRAND" "Kia" should not exist anymore
