@REQ_MCA-82
Feature: Create IMAGE-belongs-to-NODE Relationship
  As an API contributor\
  I want to attach IMAGEs to CAR MODELs (and other types of nodes)\
  So I can create a visual representation of those nodes

  @RULE_MCA-150
  Rule: An IMAGE cannot be connected to itself

    @TEST_MCA-167 @implemented
    Scenario: Aborting when trying to connect an IMAGE to itself
      Given there exists an "IMAGE" "logo.jpg"
      When the user attaches the "IMAGE" "logo.jpg" to the IMAGE "logo.jpg"
      Then the response should return with status code 422
