@REQ_MCA-240
Feature: Create BRAND-has-IMAGE Relationship
  As an API contributor\
  I want to be able to attach IMAGEs to BRANDs\
  So I can illustrate them

  @RULE_MCA-271
  Rule: The same relationship between the same nodes can only exist once

    @TEST_MCA-275 @implemented
    Scenario: Creating the same relationship again
      Given there exists a "BRAND" "Maserati"
      And there exists an "IMAGE" "logo"
      And there exists a relationship "R" between "BRAND" "Maserati" and "IMAGE" "logo"
      When the user connects "IMAGE" "logo" to "BRAND" "Maserati"
      And the response should contain the id of relationship "R"
