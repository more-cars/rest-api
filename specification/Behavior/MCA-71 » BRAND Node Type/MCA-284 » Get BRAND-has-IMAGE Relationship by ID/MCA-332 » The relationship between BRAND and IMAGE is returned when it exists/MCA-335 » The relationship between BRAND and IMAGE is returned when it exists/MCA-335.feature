@REQ_MCA-284
Feature: Get BRAND-has-IMAGE Relationship by ID
  As an API contributor\
  I want to be able to request the relationship between a BRAND and an IMAGE\
  So I can find out if they are already connected or not

  @RULE_MCA-332
  Rule: The relationship between BRAND and IMAGE is returned when it exists

    @TEST_MCA-335 @implemented
    Scenario: The relationship between BRAND and IMAGE is returned when it exists
      Given there exists a "BRAND" "Honda"
      And there exists an "IMAGE" "logo"
      And there exists a relationship "R" between "BRAND" "Honda" and "IMAGE" "logo"
      When the user requests the relationship between "BRAND" "Honda" and "IMAGE" "logo"
      Then the response should return with status code 200
      And the response should return the relationship "R"
