@REQ_MCA-94
Feature: Get IMAGE-belongs-to-NODE Relationship by ID
  As an API contributor\
  When I find an IMAGE that would be a good candidate to illustrate a specific node\
  I want to know if both nodes are already connected to each other

  @RULE_MCA-159
  Rule: When there exists a connection between IMAGE and node then that relationship is returned

    @TEST_MCA-174 @implemented
    Scenario Outline: Requesting the relationship between a specific IMAGE and specific node
      Given there exists an "IMAGE" "<image>"
      And there exists a "<node type>" "<node>"
      And there exists a relationship "R" between "IMAGE" "<image>" and "<node type>" "<node>"
      When the user requests the "belongs to node" relationship between "<image>" and "<node>"
      Then the response should return with status code 200
      And the response should return the IMAGE relationship "R"

      Examples:
        | node type | node     | image                          |
        | BRAND     | Ferrari  | ferrari-logo.jpg               |
        | CAR MODEL | Countach | lamborghini-countach-front.jpg |
