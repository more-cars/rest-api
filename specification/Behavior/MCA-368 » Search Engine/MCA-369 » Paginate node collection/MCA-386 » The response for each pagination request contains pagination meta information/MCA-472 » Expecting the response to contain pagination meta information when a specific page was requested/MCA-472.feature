@REQ_MCA-369
Feature: Paginate node collection
  As an API consumer\
  When requesting a list of NODEs (e.g. Images)\
  I want to fetch them in slices (instead of the whole collection at once)\
  So I don't have to wait for and parse a giant response object

  @RULE_MCA-386
  Rule: The response for each pagination request contains pagination meta information

    @TEST_MCA-472
    Scenario Outline: Expecting the response to contain pagination meta information when a specific page was requested
      When the user requests page 1 of the "<node_type>" collection
      Then the response should return with status code 200
      And the request should contain pagination meta information

      Examples:
        | node_type |
        | BRAND     |
        | CAR_MODEL |
        | IMAGE     |
