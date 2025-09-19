@REQ_MCA-242
Feature: Get all BRAND-has-IMAGE Relationships
  As an API consumer\
  I want to get all IMAGEs that are attached to a BRAND\
  So I can see their logo (resp. their different logos over the time)

  @RULE_MCA-277
  Rule: A list of all attached IMAGEs can be requested

    @TEST_MCA-280 @implemented
    Scenario: Requesting the attached IMAGEs
      Given there exists a "BRAND" "Maserati"
      And there are 3 IMAGEs connected to BRAND "Maserati"
      When the user requests all IMAGEs that are connected to BRAND "Maserati"
      Then the response should return a collection with 3 relationships
