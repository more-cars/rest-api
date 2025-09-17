@REQ_MCA-369
Feature: Paginate node collection
  As an API consumer\
  When requesting a list of NODEs (e.g. Images)\
  I want to fetch them in slices (instead of the whole collection at once)\
  So I don't have to wait for and parse a giant response object

  @RULE_MCA-382
  Rule: Pagination is available for each node type

    @TEST_MCA-467
    Scenario Outline: Requesting a node collection with valid pagination parameter
      When the user requests page 1 of the "<node_type>" collection
      Then the response should return with status code 200

      Examples:
        | node_type |
        | BRAND     |
        | CAR_MODEL |
        | IMAGE     |
