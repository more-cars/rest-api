@REQ_MCA-283
Feature: Has CAR MODEL-has-IMAGE Relationship
  As an API contributor\
  I want to be able to request the relationship between a CAR MODEL and an IMAGE\
  So I can find out if they are already connected or not

  @RULE_MCA-321
  Rule: A "not found" error is returned when the CAR MODEL or IMAGE does not exist

    @TEST_MCA-324 @implemented
    Scenario: Requesting the relationship between a CAR MODEL and IMAGE that do not exist
      Given there exists a "CAR MODEL" "Countach"
      And "IMAGE" "red lambo" does NOT exist
      When the user requests the relationship between "CAR MODEL" "Countach" and "IMAGE" "red lambo"
      Then the response should return with status code 404
      Given "CAR MODEL" "Countach" does NOT exist
      And there exists an "IMAGE" "red lambo"
      When the user requests the relationship between "CAR MODEL" "Countach" and "IMAGE" "red lambo"
      Then the response should return with status code 404
      Given "CAR MODEL" "Countach" does NOT exist
      And "IMAGE" "red lambo" does NOT exist
      When the user requests the relationship between "CAR MODEL" "Countach" and "IMAGE" "red lambo"
      Then the response should return with status code 404
