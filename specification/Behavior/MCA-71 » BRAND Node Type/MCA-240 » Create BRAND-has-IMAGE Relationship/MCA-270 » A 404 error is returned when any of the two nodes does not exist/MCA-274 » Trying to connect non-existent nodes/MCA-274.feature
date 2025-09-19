@REQ_MCA-240
Feature: Create BRAND-has-IMAGE Relationship
  As an API contributor\
  I want to be able to attach IMAGEs to BRANDs\
  So I can illustrate them

  @RULE_MCA-270
  Rule: A 404 error is returned when any of the two nodes does not exist

    @TEST_MCA-274 @implemented
    Scenario: Trying to connect non-existent nodes
      Given there exists a "BRAND" "Maserati"
      And "IMAGE" "logo" does NOT exist
      When the user connects "IMAGE" "logo" to "BRAND" "Maserati"
      Then the response should return with status code 404
      Given "BRAND" "Maserati" does NOT exist
      And there exists an "IMAGE" "logo"
      When the user connects "IMAGE" "logo" to "BRAND" "Maserati"
      Then the response should return with status code 404
      Given "BRAND" "Maserati" does NOT exist
      And "IMAGE" "logo" does NOT exist
      When the user connects "IMAGE" "logo" to "BRAND" "Maserati"
      Then the response should return with status code 404
