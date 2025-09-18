@REQ_MCA-77
Feature: Get all IMAGE Nodes
  As an API consumer\
  I want to be able to request all IMAGEs\
  So I can process them without having to load each of them individually

  @RULE_MCA-115
  Rule: When no IMAGEs exist in the database then an empty list is returned

    @TEST_MCA-138 @implemented
    Scenario: An empty list is returned when there exist no IMAGEs
      Given there exist 0 "IMAGE"s
      When the user requests all "IMAGE"s
      Then the response should return with status code 200
      And the response should return a collection of 0 "IMAGE"s
