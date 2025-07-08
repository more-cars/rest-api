@REQ_MCA-242
Feature: Get Relationships: BRAND has IMAGE
  As an API consumer
  I want to get all IMAGEs that are attached to a BRAND
  So I can see their logo (resp. their different logos over the time)

  @RULE_MCA-277
  Rule: A list of all attached IMAGEs can be requested

  @TEST_MCA-281 @implemented
  Scenario: Requesting the attached IMAGEs when there are none
    Given there exists a "BRAND" "Maserati"
    And there are no IMAGEs attached to BRAND "Maserati"
    When the user requests all IMAGEs that are connected to BRAND "Maserati"
    Then the response should return an empty list
