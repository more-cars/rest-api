@REQ_MCA-90
Feature: Hard Delete BRAND Node
  As an API contributor\
  I want to be able to delete a BRAND\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-349
  Rule: Hard deleting a BRAND removes all attached RELATIONSHIPs

    @TEST_MCA-360 @implemented
    Scenario: Expecting all attached RELATIONSHIPs to be removed when deleting a BRAND
      Given there exists a "BRAND" "Kia"
      And there exists a relationship "R1" between "BRAND" "Kia" and a "CAR MODEL"
      And there exists a relationship "R2" between "BRAND" "Kia" and an "IMAGE"
      When the user hard-deletes the "BRAND" "Kia"
      Then the "BRAND" "Kia" should not exist anymore
      And the relationship "R1" should not exist anymore
      And the relationship "R2" should not exist anymore
