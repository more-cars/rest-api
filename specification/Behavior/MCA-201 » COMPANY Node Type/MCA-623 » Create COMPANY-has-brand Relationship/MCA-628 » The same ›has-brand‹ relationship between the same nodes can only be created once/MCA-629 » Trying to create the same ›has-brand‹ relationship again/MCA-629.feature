@REQ_MCA-623
Feature: Create COMPANY-has-brand Relationship
  As an API contributor\
  I want to be able to connect BRANDS to a COMPANY\
  So an API consumer can find out which BRANDS are owned by which COMPANY

  @RULE_MCA-628
  Rule: The same ›has-brand‹ relationship between the same nodes can only be created once

    @TEST_MCA-629 @implemented
    Scenario: Trying to create the same ›has-brand‹ relationship again
      Given there exists a "COMPANY" "Volkswagen AG"
      And there exists a "BRAND" "VW"
      And there exists a "has-brand" relationship between "Volkswagen AG" and "VW"
      When the user creates a "has-brand" relationship between "Volkswagen AG" and "VW"
      Then the response should return with status code 304
      And the response should return an empty body
