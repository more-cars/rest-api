@REQ_MCA-76
Feature: Get IMAGE Node by ID
  As an API consumer\
  I want to to be able to request a specific IMAGE node\
  So I can find out its URL to actually see the photo

  @RULE_MCA-98
  Rule: Requesting an IMAGE with a valid ID returns the respective node

    @TEST_MCA-123 @implemented
    Scenario: Requesting an IMAGE with a valid ID
      Given there exists an "IMAGE" "A"
      When the user requests the "IMAGE" "A"
      Then the response should return with status code 200
      And the response should return the IMAGE "A"
