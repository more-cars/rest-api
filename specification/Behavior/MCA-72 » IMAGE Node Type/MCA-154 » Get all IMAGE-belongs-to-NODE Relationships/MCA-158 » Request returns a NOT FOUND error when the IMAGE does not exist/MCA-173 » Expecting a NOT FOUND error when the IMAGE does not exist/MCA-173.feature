@REQ_MCA-154
Feature: Get all IMAGE-belongs-to-NODE Relationships
  As an API contributor\
  I want to find out whether an IMAGE is already connected to other nodes\
  So I can reduce the number of orphans in the database

  @RULE_MCA-158
  Rule: Request returns a NOT FOUND error when the IMAGE does not exist

    @TEST_MCA-173 @implemented
    Scenario: Expecting a NOT FOUND error when the IMAGE does not exist
      Given "IMAGE" "A" does NOT exist
      When the user requests all relationships for IMAGE "A"
      Then the response should return with status code 404
