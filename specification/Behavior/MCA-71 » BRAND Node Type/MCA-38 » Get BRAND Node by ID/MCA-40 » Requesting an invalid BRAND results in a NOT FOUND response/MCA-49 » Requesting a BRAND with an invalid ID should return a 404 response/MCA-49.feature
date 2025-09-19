@REQ_MCA-38
Feature: Get BRAND Node by ID
  As an API consumer \
  When I only have the ID of a brand\
  I want to be able to load that brand\
  So I can find out its name and other information

  @RULE_MCA-40
  Rule: Requesting an invalid BRAND results in a NOT FOUND response

    @TEST_MCA-49 @implemented
    Scenario: Requesting a BRAND with an invalid ID should return a 404 response
      When the user requests a non-existing "BRAND"
      Then the response should return with status code 404
