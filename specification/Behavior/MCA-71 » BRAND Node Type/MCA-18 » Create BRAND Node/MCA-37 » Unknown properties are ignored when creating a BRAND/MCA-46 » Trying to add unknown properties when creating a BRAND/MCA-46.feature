@REQ_MCA-18
Feature: Create BRAND Node
  As an API contributor\
  I want to be able to create BRANDs\
  So I can fill gaps in the database

  @RULE_MCA-37
  Rule: Unknown properties are ignored when creating a BRAND

    @TEST_MCA-46 @implemented
    Scenario: Trying to add unknown properties when creating a BRAND
      When the user creates a BRAND "A" with the following mixed data
        | key      | value           |
        | name     | Test Brand Test |
        | fonded   | 1955            |
        | defunckt | 1999            |
      Then the following keys in the response object should be of value null
        | key     |
        | founded |
        | defunct |
      Then the response should NOT contain the following keys
        | key      |
        | fonded   |
        | defunckt |
