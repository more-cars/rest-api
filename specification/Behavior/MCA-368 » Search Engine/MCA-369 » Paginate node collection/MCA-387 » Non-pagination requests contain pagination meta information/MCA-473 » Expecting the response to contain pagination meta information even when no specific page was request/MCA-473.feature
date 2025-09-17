@REQ_MCA-369
Feature: Paginate node collection
  As an API consumer\
  When requesting a list of NODEs (e.g. Images)\
  I want to fetch them in slices (instead of the whole collection at once)\
  So I don't have to wait for and parse a giant response object

  @RULE_MCA-387
  Rule: Non-pagination requests contain pagination meta information

    @TEST_MCA-473
    Scenario Outline: Expecting the response to contain pagination meta information even when no specific page was requested
      When the user requests the "<node_type>" collection
      Then the response should return with status code 200
      And the request should contain pagination meta information

      Examples:
        | node_type |
        | BRAND     |
        | CAR_MODEL |
        | IMAGE     |
