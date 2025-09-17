@REQ_MCA-82
Feature: Create IMAGE-belongs-to-NODE Relationship
  As an API contributor\
  I want to attach IMAGEs to CAR MODELs (and other types of nodes)\
  So I can create a visual representation of those nodes

  @RULE_MCA-152
  Rule: An IMAGE can be connected to multiple nodes of the same type

    @TEST_MCA-169
    Scenario Outline: Connecting an IMAGE to multiple nodes of the same type
      Given there exists a "<node type>" "<node 1>"
      And there exists a "<node type>" "<node 2>"
      And there exists an "IMAGE" "<image>"
      When the user attaches the "<node type>" "<node 1>" to the IMAGE "<image>"
      And the user attaches the "<node type>" "<node 2>" to the IMAGE "<image>"
      Then "<node type>" "<node 1>" should be connected to IMAGE "<image>"
      And "<node type>" "<node 2>" should be connected to IMAGE "<image>"

      Examples:
        | node type | node 1   | node 2 | image                    |
        | BRAND     | Ferrari  | Toyota | brand-collection.jpg     |
        | CAR MODEL | Countach | Golf   | car-model-collection.jpg |
