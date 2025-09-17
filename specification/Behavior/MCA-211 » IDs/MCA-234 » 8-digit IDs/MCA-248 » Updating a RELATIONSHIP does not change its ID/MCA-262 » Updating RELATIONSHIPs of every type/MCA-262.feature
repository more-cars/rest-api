@REQ_MCA-234
Feature: 8-digit IDs
  As a user\
  I want the NODE IDs to be short enough \
  So I can remember them\
  But long enough \
  So they can be used as meaningful search terms

  @RULE_MCA-248
  Rule: Updating a RELATIONSHIP does not change its ID

    @TEST_MCA-262
    Scenario: Updating RELATIONSHIPs of every type
      Given there exists a relationship "R" between a CAR MODEL and a BRAND
      When the user updates the relationship "R"
      Then the response should contain the id of relationship "R"
      Given there exists a relationship "R" between a IMAGE and a CAR MODEL
      When the user updates the relationship "R"
      Then the response should contain the id of relationship "R"
      Given there exists a relationship "R" between a IMAGE and a BRAND
      When the user updates the relationship "R"
      Then the response should contain the id of relationship "R"
