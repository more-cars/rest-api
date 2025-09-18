@REQ_MCA-77
Feature: Get all IMAGE Nodes
  As an API consumer\
  I want to be able to request all IMAGEs\
  So I can process them without having to load each of them individually

  @RULE_MCA-114
  Rule: Requesting an IMAGE collection returns a list of all existing IMAGE nodes

    @TEST_MCA-139 @implemented
    Scenario: Requesting all IMAGEs returns a collection of all existing IMAGEs
      Given there exist 13 "IMAGE"s
      When the user requests all "IMAGE"s
      Then the response should return with status code 200
      And the response should return a collection of 13 "IMAGE"s
