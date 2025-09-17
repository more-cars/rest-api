@REQ_MCA-388
Feature: Has CAR MODEL-has-prime-image-IMAGE Relationship
  As an API contributor\
  I want to find out if a specific IMAGE is already attached as prime image to a specific CAR MODEL\
  So I can find gaps in the database

  @RULE_MCA-402
  Rule: The has-prime-image relationship is returned when provided with valid data

    @TEST_MCA-418 @implemented
    Scenario: Requesting a specific prime IMAGE relationship for a CAR MODEL
      Given there exists a "CAR MODEL" "Mondeo"
      And there exists an "IMAGE" "front-left.jpg"
      And there exists a "has prime image" relationship "R" between "Mondeo" and "front-left.jpg"
      When the user requests the "has prime image" relationship between "Mondeo" and "front-left.jpg"
      Then the response should return with status code 200
      And the response should return the relationship "R"
