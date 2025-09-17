@REQ_MCA-369
Feature: Paginate node collection
  As an API consumer\
  When requesting a list of NODEs (e.g. Images)\
  I want to fetch them in slices (instead of the whole collection at once)\
  So I don't have to wait for and parse a giant response object

  @RULE_MCA-383
  Rule: Each page contains a pre-defined amount of nodes

    @TEST_MCA-468
    Scenario Outline: Expecting 100 items per page
      Given there exist 110 <node_type>s
      When the user requests page 1 of the "<node_type>" collection
      Then the response should contain 100 items
      When the user requests page 2 of the "<node_type>" collection
      Then the response should contain 10 items

      Examples:
        | node_type |
        | BRAND     |
        | CAR_MODEL |
        | IMAGE     |
