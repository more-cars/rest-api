@REQ_MCA-94
Feature: Get IMAGE-belongs-to-NODE Relationship by ID
  As an API contributor\
  When I find an IMAGE that would be a good candidate to illustrate a specific node\
  I want to know if both nodes are already connected to each other

  @RULE_MCA-162
  Rule: Request is invalid when IMAGE and partner node are identical

    @TEST_MCA-177 @implemented
    Scenario: Aborting when requesting a relationship where IMAGE and partner node are identical
      Given there exists an "IMAGE" "logo.jpg"
      When the user requests the "belongs to node" relationship between "logo.jpg" and "logo.jpg"
      Then the response should return with status code 422
