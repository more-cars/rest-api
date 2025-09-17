@REQ_MCA-82
Feature: Create IMAGE-belongs-to-NODE Relationship
  As an API contributor\
  I want to attach IMAGEs to CAR MODELs (and other types of nodes)\
  So I can create a visual representation of those nodes

  @RULE_MCA-153
  Rule: An IMAGE can be connected to multiple nodes of different type

    @TEST_MCA-170
    Scenario: Connecting an IMAGE to multiple nodes of different type
      Given there exists a "BRAND" "Porsche"
      And there exists a "CAR MODEL" "Cayman"
      And there exists an "IMAGE" "porsche-cayman.jpg"
      When the user attaches the "BRAND" "Porsche" to the image "porsche-cayman.jpg"
      And the user attaches the "CAR MODEL" "Cayman" to the image "porsche-cayman.jpg"
      Then "BRAND" "Porsche" should be connected to image "porsche-cayman.jpg"
      And "CAR MODEL" "Cayman" should be connected to image "porsche-cayman.jpg"
