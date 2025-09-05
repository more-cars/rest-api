@REQ_MCA-94
Feature: Request relationship between an IMAGE and a specific node
  As an API contributor
  When I find an IMAGE that would be a good candidate to illustrate a specific node
  I want to know if both nodes are already connected to each other

  @RULE_MCA-161
  Rule: Request returns a NOT FOUND error when there exists no connection between IMAGE and node

  @TEST_MCA-175 @implemented
  Scenario Outline: Expecting a NOT FOUND error when there exists no connection between IMAGE and node
    Given there exists a "<node type>" "<node>"
    And there exists an "IMAGE" "<image>"
    And there exists NO "belongs to node" relationship "R" between "<image>" and "<node>"
    When the user requests the IMAGE relationship between IMAGE "<image>" and "<node type>" "<node>"
    Then the response should return with status code 404

    Examples:
      | node type | node     | image                          |
      | BRAND     | Ferrari  | ferrari-logo.jpg               |
      | CAR MODEL | Countach | lamborghini-countach-front.jpg |
