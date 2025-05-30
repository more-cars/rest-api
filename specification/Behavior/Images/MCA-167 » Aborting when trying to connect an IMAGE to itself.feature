@REQ_MCA-82
Feature: Create relationship between IMAGE and a specific node
  As an API contributor
  I want to attach IMAGEs to other nodes (CAR MODELs, BRANDs, etc)
  So I can create a visual representation of those nodes

  @RULE_MCA-150
  Rule: An IMAGE cannot be connected to itself

  @TEST_MCA-167 @implemented
  Scenario: Aborting when trying to connect an IMAGE to itself
    Given there exists an "IMAGE" "logo.jpg"
    When the user tries to attach the "IMAGE" "logo.jpg" to the IMAGE "logo.jpg"
    Then the response should return with status code 422
