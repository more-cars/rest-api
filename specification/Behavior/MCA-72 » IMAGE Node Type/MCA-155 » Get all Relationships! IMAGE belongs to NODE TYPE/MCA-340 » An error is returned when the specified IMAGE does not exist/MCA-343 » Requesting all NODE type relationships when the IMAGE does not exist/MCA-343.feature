@REQ_MCA-155
Feature: Get all Relationships: IMAGE belongs to NODE TYPE
  As an API consumer\
  I want to know all nodes an IMAGE is connected to\
  But the returned list should be grouped by NODE type\
  So I get a semantic perspective on the data

  @RULE_MCA-340
  Rule: An error is returned when the specified IMAGE does not exist

    @TEST_MCA-343 @implemented
    Scenario: Requesting all NODE type relationships when the IMAGE does not exist
      Given "IMAGE" "bmw bonnet" does NOT exist
      When the user requests a grouped list of all relationships for the IMAGE "bmw bonnet"
      Then the response should return with status code 404
