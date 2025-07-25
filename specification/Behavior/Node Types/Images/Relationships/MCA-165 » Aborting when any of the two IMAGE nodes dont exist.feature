@REQ_MCA-82
Feature: Create relationship between IMAGE and a specific node
  As an API contributor
  I want to attach IMAGEs to other nodes (CAR MODELs, BRANDs, etc)
  So I can create a visual representation of those nodes

  @RULE_MCA-147
  Rule: The relationship creation is aborted when any of the two nodes don't exist

  @TEST_MCA-165 @implemented
  Scenario Outline: Aborting when any of the two IMAGE nodes don't exist
    Given there exists a "<node type>" "<node>"
    And "IMAGE" "<image>" does NOT exist
    When the user tries to attach the "<node type>" "<node>" to the IMAGE "<image>"
    Then the response should return with status code 404

    Given "<node type>" "<node>" does NOT exist
    And there exists an "IMAGE" "<image>"
    When the user tries to attach the "<node type>" "<node>" to the IMAGE "<image>"
    Then the response should return with status code 404

    Given "<node type>" "<node>" does NOT exist
    And "IMAGE" "<image>" does NOT exist
    When the user tries to attach the "<node type>" "<node>" to the IMAGE "<image>"
    Then the response should return with status code 404

    Examples:
      | node type | node     | image                          |
      | BRAND     | Ferrari  | ferrari-logo.jpg               |
      | CAR MODEL | Countach | lamborghini-countach-front.jpg |
