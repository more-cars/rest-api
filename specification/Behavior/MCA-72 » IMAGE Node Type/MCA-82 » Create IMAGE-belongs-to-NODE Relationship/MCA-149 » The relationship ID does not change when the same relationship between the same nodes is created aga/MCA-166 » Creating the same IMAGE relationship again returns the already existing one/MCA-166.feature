@REQ_MCA-82
Feature: Create IMAGE-belongs-to-NODE Relationship
  As an API contributor\
  I want to attach IMAGEs to CAR MODELs (and other types of nodes)\
  So I can create a visual representation of those nodes

  @RULE_MCA-149
  Rule: The relationship ID does not change when the same relationship between the same nodes is created again

    @TEST_MCA-166 @implemented
    Scenario Outline: Creating the same IMAGE relationship again returns the already existing one
      Given there exists a "<node type>" "<node>"
      And there exists an "IMAGE" "<image>"
      And there exists a relationship "R" between "IMAGE" "<image>" and "<node type>" "<node>"
      When the user attaches the "<node type>" "<node>" to the IMAGE "<image>"
      Then the response should return with status code 201
      And the response should return the relationship "R"

      Examples:
        | node type | node     | image                          |
        | BRAND     | Ferrari  | ferrari-logo.jpg               |
        | CAR MODEL | Countach | lamborghini-countach-front.jpg |
