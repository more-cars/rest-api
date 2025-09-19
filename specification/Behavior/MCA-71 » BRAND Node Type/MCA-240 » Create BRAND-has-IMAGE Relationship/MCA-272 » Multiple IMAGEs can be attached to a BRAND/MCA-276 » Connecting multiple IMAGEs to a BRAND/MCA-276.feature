@REQ_MCA-240
Feature: Create BRAND-has-IMAGE Relationship
  As an API contributor\
  I want to be able to attach IMAGEs to BRANDs\
  So I can illustrate them

  @RULE_MCA-272
  Rule: Multiple IMAGEs can be attached to a BRAND

    @TEST_MCA-276 @implemented
    Scenario: Connecting multiple IMAGEs to a BRAND
      Given there exists a "BRAND" "Maserati"
      And there exists an "IMAGE" "logo 1960"
      And there exists an "IMAGE" "logo 1980"
      And there exists an "IMAGE" "logo 2010"
      When the user connects "IMAGE" "logo 1960" to "BRAND" "Maserati"
      And the user connects "IMAGE" "logo 1980" to "BRAND" "Maserati"
      And the user connects "IMAGE" "logo 2010" to "BRAND" "Maserati"
      Then the IMAGE "logo 1960" should be connected to the BRAND "Maserati"
      And the IMAGE "logo 1980" should be connected to the BRAND "Maserati"
      And the IMAGE "logo 2010" should be connected to the BRAND "Maserati"
