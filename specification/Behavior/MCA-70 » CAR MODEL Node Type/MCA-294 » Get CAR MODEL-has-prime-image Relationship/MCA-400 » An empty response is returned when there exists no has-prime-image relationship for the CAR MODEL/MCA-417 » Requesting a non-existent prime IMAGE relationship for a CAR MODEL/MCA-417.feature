@REQ_MCA-294
Feature: Get CAR MODEL-has-prime-image Relationship
  As an API consumer\
  I want to be able to request the prime IMAGE for a CAR MODEL\
  So I can represent the node in the best possible form in the frontend\
  (Because I don't know which one from the image gallery is the best one)

  @RULE_MCA-400
  Rule: An empty response is returned when there exists no has-prime-image relationship for the CAR MODEL

    @TEST_MCA-417 @implemented
    Scenario: Requesting a non-existent prime IMAGE relationship for a CAR MODEL
      Given there exists a "CAR MODEL" "Mondeo"
      And there exists NO "has prime image" relationship "R" for "Mondeo"
      When the user requests the "has prime image" relationship for "Mondeo"
      Then the response should return with status code 200
      And the response should return an empty body
