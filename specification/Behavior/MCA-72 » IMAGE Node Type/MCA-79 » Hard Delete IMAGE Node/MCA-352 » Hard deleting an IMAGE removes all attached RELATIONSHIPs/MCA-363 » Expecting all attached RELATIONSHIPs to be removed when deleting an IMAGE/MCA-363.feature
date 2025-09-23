@REQ_MCA-79
Feature: Hard Delete IMAGE Node
  As an API contributor\
  I want to be able to delete an IMAGE\
  So I can clean up bad data, test data or redundant data

  @RULE_MCA-352
  Rule: Hard deleting an IMAGE removes all attached RELATIONSHIPs

    @TEST_MCA-363 @implemented
    Scenario: Expecting all attached RELATIONSHIPs to be removed when deleting an IMAGE
      Given there exists an "IMAGE" "logo"
      And there exists a relationship "R1" between "IMAGE" "logo" and a "CAR MODEL"
      And there exists a relationship "R2" between "IMAGE" "logo" and a "BRAND"
      When the user hard-deletes the "IMAGE" "logo"
      Then the "IMAGE" "logo" should not exist anymore
      And the relationship "R1" should not exist anymore
      And the relationship "R2" should not exist anymore
