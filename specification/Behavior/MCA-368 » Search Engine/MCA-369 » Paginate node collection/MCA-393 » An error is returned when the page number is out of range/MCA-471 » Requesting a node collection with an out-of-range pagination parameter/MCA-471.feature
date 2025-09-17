@REQ_MCA-369
Feature: Paginate node collection
  As an API consumer\
  When requesting a list of NODEs (e.g. Images)\
  I want to fetch them in slices (instead of the whole collection at once)\
  So I don't have to wait for and parse a giant response object

  @RULE_MCA-393
  Rule: An error is returned when the page number is out of range

    @TEST_MCA-471
    Scenario Outline: Requesting a node collection with an out-of-range pagination parameter
      Given there exist 3 "<node_type>"s
      When the user requests page 17 of the "<node_type>" collection
      Then the response should return with status code 404

      Examples:
        | node_type |
        | BRAND     |
        | CAR_MODEL |
        | IMAGE     |
