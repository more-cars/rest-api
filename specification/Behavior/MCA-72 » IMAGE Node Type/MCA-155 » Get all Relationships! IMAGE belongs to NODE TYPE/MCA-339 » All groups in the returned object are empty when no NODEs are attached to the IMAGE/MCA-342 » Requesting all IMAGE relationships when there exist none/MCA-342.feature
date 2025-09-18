@REQ_MCA-155
Feature: Get all Relationships: IMAGE belongs to NODE TYPE
  As an API consumer\
  I want to know all nodes an IMAGE is connected to\
  But the returned list should be grouped by NODE type\
  So I get a semantic perspective on the data

  @RULE_MCA-339
  Rule: All groups in the returned object are empty when no NODEs are attached to the IMAGE

    @TEST_MCA-342 @implemented
    Scenario: Requesting all IMAGE relationships when there exist none
      Given there exists an "IMAGE" "bmw bonnet"
      When the user requests a grouped list of all relationships for the IMAGE "bmw bonnet"
      Then the response should return with status code 200
      And all groups in the response should be an empty list
