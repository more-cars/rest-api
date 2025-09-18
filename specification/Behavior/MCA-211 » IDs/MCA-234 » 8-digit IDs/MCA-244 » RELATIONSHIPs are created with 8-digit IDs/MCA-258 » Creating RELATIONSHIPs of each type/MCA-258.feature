@REQ_MCA-234
Feature: 8-digit IDs
  As a user\
  I want the NODE IDs to be short enough \
  So I can remember them\
  But long enough \
  So they can be used as meaningful search terms

  @RULE_MCA-244
  Rule: RELATIONSHIPs are created with 8-digit IDs

    @TEST_MCA-258 @implemented
    Scenario: Creating RELATIONSHIPs of each type
      When the user connects a "CAR MODEL" to a "BRAND"
      Then the property "relationship_id" in the response should be a number greater than 11999999
      And the property "relationship_id" in the response should be a number lesser than 99999999
      When the user connects a "CAR MODEL" to an "IMAGE"
      Then the property "relationship_id" in the response should be a number greater than 11999999
      And the property "relationship_id" in the response should be a number lesser than 99999999
      When the user connects a "BRAND" to an "IMAGE"
      Then the property "relationship_id" in the response should be a number greater than 11999999
      And the property "relationship_id" in the response should be a number lesser than 99999999
