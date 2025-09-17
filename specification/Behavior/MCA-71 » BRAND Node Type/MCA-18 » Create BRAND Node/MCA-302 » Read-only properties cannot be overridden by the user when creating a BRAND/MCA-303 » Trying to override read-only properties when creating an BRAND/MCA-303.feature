@REQ_MCA-18
Feature: Create BRAND Node
  As an API contributor\
  I want to be able to create BRANDs\
  So I can fill gaps in the database

  @RULE_MCA-302
  Rule: Read-only properties cannot be overridden by the user when creating a BRAND

    @TEST_MCA-303
    Scenario: Trying to override read-only properties when creating an BRAND
      When the user creates a "BRAND" with the following data
        | _key_      | _value_              |
        | id         | 1234                 |
        | name       | Toyota               |
        | created_at | 2022-07-23T03:00:00Z |
        | updated_at | 2022-07-23T03:00:00Z |
      Then the response should return with status code 201
      And the response should NOT contain the following properties
        | _key_      | _value_              |
        | id         | 1234                 |
        | created_at | 2022-07-23T03:00:00Z |
        | updated_at | 2022-07-23T03:00:00Z |
