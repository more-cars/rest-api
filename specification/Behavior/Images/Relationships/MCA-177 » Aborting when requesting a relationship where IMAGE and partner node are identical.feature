@REQ_MCA-94
Feature: Request relationship between an IMAGE and a specific node
  As an API contributor
  When I find an IMAGE that would be a good candidate to illustrate a specific node
  I want to know if both nodes are already connected to each other

  @RULE_MCA-162
  Rule: Request is invalid when IMAGE and partner node are identical

  @TEST_MCA-177 @implemented
  Scenario: Aborting when requesting a relationship where IMAGE and partner node are identical
    Given there exists an "IMAGE" "logo.jpg"
    When the user tries to request the IMAGE relationship between IMAGE "logo.jpg" and "IMAGE" "logo.jpg"
    Then the response should return with status code 422
