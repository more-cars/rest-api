@REQ_MCA-240
Feature: Create BRAND-has-IMAGE Relationship
  As an API contributor\
  I want to be able to attach IMAGEs to BRANDs\
  So I can illustrate them

  @RULE_MCA-269
  Rule: Any existing IMAGE can be connected to any existing BRAND

    @TEST_MCA-273 @implemented
    Scenario: Connecting an IMAGE to a BRAND
      Given there exists a "BRAND" "Maserati"
      And there exists an "IMAGE" "logo"
      When the user connects "IMAGE" "logo" to "BRAND" "Maserati"
      Then the response should return with status code 201
