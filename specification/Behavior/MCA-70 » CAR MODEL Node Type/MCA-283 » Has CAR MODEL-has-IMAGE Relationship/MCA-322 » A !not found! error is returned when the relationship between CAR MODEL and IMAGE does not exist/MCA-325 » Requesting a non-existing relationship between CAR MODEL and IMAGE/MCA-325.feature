@REQ_MCA-283
Feature: Has CAR MODEL-has-IMAGE Relationship
  As an API contributor\
  I want to be able to request the relationship between a CAR MODEL and an IMAGE\
  So I can find out if they are already connected or not

  @RULE_MCA-322
  Rule: A "not found" error is returned when the relationship between CAR MODEL and IMAGE does not exist

    @TEST_MCA-325 @implemented
    Scenario: Requesting a non-existing relationship between CAR MODEL and IMAGE
      Given there exists a "CAR MODEL" "Countach"
      And there exists an "IMAGE" "red lambo"
      And there exists NO "has image" relationship "R" between "Countach" and "red lambo"
      When the user requests the relationship between "CAR MODEL" "Countach" and "IMAGE" "red lambo"
      Then the response should return with status code 404
