@REQ_MCA-154
Feature: Get all IMAGE-belongs-to-NODE Relationships
  As an API contributor\
  I want to find out whether an IMAGE is already connected to other nodes\
  So I can reduce the number of orphans in the database

  @RULE_MCA-156
  Rule: When there exist nodes that are connected to the IMAGE then those relationships are returned

    @TEST_MCA-171 @implemented
    Scenario: Requesting all relationships that exist for the IMAGE
      Given there exists an "IMAGE" "A"
      And there exist 7 relationships for IMAGE "A"
      When the user requests all relationships for IMAGE "A"
      Then the response should return with status code 200
      And the response should return a collection of 7 IMAGE relationships
