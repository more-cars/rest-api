@REQ_MCA-539
Feature: Create COMPANY Node
  As an API contributor
  I want to be able to create COMPANY nodes
  So I can fill gaps in the database

  @RULE_MCA-542
  Rule: Requests to create a COMPANY are rejected when the provided data is invalid

    @TEST_MCA-543 @implemented
    Scenario: Trying to create a COMPANY with missing mandatory information
      When the user tries to create a "COMPANY" "BMW AG" with the following data
        | key | value | datatype |
      Then the request should be rejected with status code 400
