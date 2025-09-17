@REQ_MCA-369
Feature: Paginate node collection
  As an API consumer\
  When requesting a list of NODEs (e.g. Images)\
  I want to fetch them in slices (instead of the whole collection at once)\
  So I don't have to wait for and parse a giant response object

  @RULE_MCA-384
  Rule: Each page contains different nodes

    @TEST_MCA-469
    Scenario Outline: Expecting each page to contain different nodes
      Given there exist 110 <node_type>s
      When the user requests page 1 of the "<node_type>" collection as "C1"
      And the user requests page 2 of the "<node_type>" collection as "C2"
      Then collection "C1" should not contain items of collection "C2"
      And collection "C2" should not contain items of collection "C1"

      Examples:
        | node_type |
        | BRAND     |
        | CAR_MODEL |
        | IMAGE     |
