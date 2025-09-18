@REQ_MCA-17
Feature: Providing timestamps for all NODEs
  As an API consumer\
  I want all nodes to have timestamps\
  So I can assess how up-to-date the provided information is

  @RULE_MCA-22
  Rule: For never updated NODEs the two timestamps are identical

    @TEST_MCA-32 @implemented
    Scenario Outline: For newly created nodes the timestamps "created_at" and "updated_at" should be identical
      Given there exists a "<node type>" "A"
      When the user requests the "<node type>" "A"
      Then the properties "created_at" and "updated_at" in the response should be identical

      Examples:
        | node type |
        | COMPANY   |
        | BRAND     |
        | CAR MODEL |
        | IMAGE     |
