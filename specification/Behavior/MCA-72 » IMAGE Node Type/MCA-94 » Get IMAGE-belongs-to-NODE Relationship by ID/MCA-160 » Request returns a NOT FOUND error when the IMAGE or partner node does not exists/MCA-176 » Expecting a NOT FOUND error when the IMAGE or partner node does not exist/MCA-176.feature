@REQ_MCA-94
Feature: Get IMAGE-belongs-to-NODE Relationship by ID
  As an API contributor\
  When I find an IMAGE that would be a good candidate to illustrate a specific node\
  I want to know if both nodes are already connected to each other

  @RULE_MCA-160
  Rule: Request returns a NOT FOUND error when the IMAGE or partner node does not exists

    @TEST_MCA-176 @implemented
    Scenario Outline: Expecting a NOT FOUND error when the IMAGE or partner node does not exist
      Given there exists a "<node type>" "<node>"
      And "IMAGE" "<image>" does NOT exist
      When the user requests the "belongs to node" relationship between "<image>" and "<node>"
      Then the response should return with status code 404
      Given "<node type>" "<node>" does NOT exist
      And there exists an "IMAGE" "<image>"
      When the user requests the "belongs to node" relationship between "<image>" and "<node>"
      Then the response should return with status code 404
      Given "<node type>" "<node>" does NOT exist
      And "IMAGE" "<image>" does NOT exist
      When the user requests the "belongs to node" relationship between "<image>" and "<node>"
      Then the response should return with status code 404

      Examples:
        | node type | node     | image                          |
        | BRAND     | Ferrari  | ferrari-logo.jpg               |
        | CAR MODEL | Countach | lamborghini-countach-front.jpg |
