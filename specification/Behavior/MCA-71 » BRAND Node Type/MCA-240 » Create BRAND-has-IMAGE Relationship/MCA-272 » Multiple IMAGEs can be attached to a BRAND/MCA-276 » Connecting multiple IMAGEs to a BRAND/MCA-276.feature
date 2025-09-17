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

    When the user attaches the IMAGE "logo 1960" to the BRAND "Maserati"
    And the user attaches the IMAGE "logo 1980" to the BRAND "Maserati"
    And the user attaches the IMAGE "logo 2010" to the BRAND "Maserati"

    Then IMAGE "logo 1960" should be connected to BRAND "Maserati"
    And IMAGE "logo 1980" should be connected to BRAND "Maserati"
    And IMAGE "logo 2010" should be connected to BRAND "Maserati"
